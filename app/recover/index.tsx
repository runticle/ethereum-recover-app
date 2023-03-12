import React, { FunctionComponent, useReducer, useState } from 'react';

import styled from 'styled-components/native';
import { Container, MNEMONIC_LENGTH } from '../../components/Globals';
import NormalButton from '../../components/NormalButton';
import LargeText from '../../components/Text/LargeText';

import { Stack, useRouter } from 'expo-router';
import NormalTextInput from '../../components/Text/NormalTextInput';
import MnemonicList from '../../components/MnemonicList';

import types from '../../reducers/types';

import { useMnemonic } from '../../context/MnemonicContext';

const RecoverView = styled(Container)`
  justify-content: space-between;
`

const RecoverScreen: FunctionComponent = () => {
  const router = useRouter();

  const [currentInput, setCurrentInput ] = useState('')

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


  async function onSubmit() {
    // TODO validation

    // TODO use ethers

    // TODO some redux magic for loading state
  }

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
          : <NormalButton onPress={onSubmit}>
          Submit
          </NormalButton>
        }
      
      </RecoverView>
  );
}

export default RecoverScreen;