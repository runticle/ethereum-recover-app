import React, { FunctionComponent, useEffect, useState } from 'react';

import styled from 'styled-components/native';
import { Container, MNEMONIC_LENGTH } from '../../components/Globals';

import { Stack, useRouter } from 'expo-router';
import NormalTextInput from '../../components/Text/NormalTextInput';
import MnemonicList from '../../components/MnemonicList';

import types from '../../reducers/types';

import { useMnemonic } from '../../context/MnemonicContext';
import SubmitMnemonic from '../../components/Buttons/SubmitMnemonic';
import NormalText from '../../components/Text/NormalText';

const RecoverView = styled(Container)`
  justify-content: space-between;
`

const RecoverScreen: FunctionComponent = () => {
  const [currentInput, setCurrentInput ] = useState('')
  const router = useRouter()

  const { state, dispatch } = useMnemonic()

  const { mnemonic } = state;

  function handleAddWord(value: string) {
    dispatch({ type: types.ADD_WORD, payload: value });
  }

  function handleInput(value: string) {
    const lastInput = value.charAt(value.length - 1)

    value = value.toLocaleLowerCase().trim()
    
    // if user pressed Space and there is an actual string to add
    // add word to array and reset textinput
    if(lastInput === ' ' && value.trim().length) {
      handleAddWord(value)
      setCurrentInput('')
    } else {
      setCurrentInput(value)
    }
  }

  const inputComplete = mnemonic.length === MNEMONIC_LENGTH

  useEffect(()=> {
    // TODO temp fix
    // * Look out for the presence of a wallet in our reducer. If we find one, we will head to the wallet screen
    if(state.wallet?.address) {
      router.replace('/wallet')
    }
  }, [state.wallet?.address])

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
          />
          : <SubmitMnemonic />
        }
      
      </RecoverView>
  );
}

export default RecoverScreen;