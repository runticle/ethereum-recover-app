import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import { Alert } from 'react-native';
import { TextInput } from 'react-native/types';

import styled from 'styled-components/native';
import { Container, MNEMONIC_LENGTH } from '../../components/Globals';

import { Stack, useRouter } from 'expo-router';
import NormalTextInput from '../../components/Text/NormalTextInput';
import MnemonicList from '../../components/MnemonicList';

import types from '../../reducers/types';

import { useWallet } from '../../context/WalletContext';
import SubmitMnemonic from '../../components/Buttons/SubmitMnemonic';
import NormalText from '../../components/Text/NormalText';

const RecoverView = styled(Container)`
  justify-content: space-between;
`

const RecoverScreen: FunctionComponent = () => {
  const [currentInput, setCurrentInput ] = useState('')
  const router = useRouter()

  const { state, dispatch } = useWallet()

  const { mnemonic } = state;

  function handleAddWord(value: string) {
    dispatch({ type: types.ADD_WORD, payload: value });
  }

  function handleInput(value: string, submit: boolean = false) {
    const lastInput = value.charAt(value.length - 1)

    value = value.toLocaleLowerCase().trim()
    
    // User can either press the submit button to add a word
    // or if they press space, we will also add the word.
    if(submit || lastInput === ' ' && value.trim().length) {
      handleAddWord(value)
      setCurrentInput('')
    } else {
      setCurrentInput(value)
    }
  }

  const inputComplete = mnemonic.length === MNEMONIC_LENGTH

  useEffect(()=> {
    if(state.error) {
      Alert.alert('Something went wrong', state.error)
    }

    // * Look out for the presence of a wallet in our reducer. If we find one, we will head to the wallet screen
    if(state.wallet?.address) {
      router.replace('/wallet')
    }
  }, [state.wallet?.address, state.error])

  if(state.loading) return <NormalText>Loading...</NormalText>

  return (  
      <RecoverView>
        <Stack.Screen options={{title: 'Recovery'}} />
        <MnemonicList />
        { 
          !inputComplete ? <NormalTextInput 
          title="Enter your mnemonic"
          value={currentInput} 
          onChangeText={(value)=>handleInput(value)} 
          editable={!inputComplete}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter word"
          blurOnSubmit={false}
          onSubmitEditing={(event) => {
            handleInput(event.nativeEvent.text, true)
          }}
          />
          : <SubmitMnemonic />
        }
      
      </RecoverView>
  );
}

export default RecoverScreen;