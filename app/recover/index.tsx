import { FunctionComponent, useState } from 'react';


import styled from 'styled-components/native';
import { Container, MNEMONIC_LENGTH } from '../../components/Globals';
import NormalButton from '../../components/NormalButton';
import LargeText from '../../components/Text/LargeText';

import { useRouter } from 'expo-router';
import NormalTextInput from '../../components/Text/NormalTextInput';
import MnemonicList from '../../components/MnemonicList';

const RecoverView = styled(Container)`
  justify-content: space-between;
`

const RecoverScreen: FunctionComponent = () => {
  const router = useRouter();

  const [mnemonic, setMnemonic] = useState([]);
  const [currentInput, setCurrentInput ] = useState('')

  function handleInput(value: string) {
    const lastInput = value.charAt(value.length - 1)

    value = value.toLocaleLowerCase()
    
    // if user pressed Space and there is an actual string to add
    // add word to array and reset textinput
    if(lastInput === ' ' && value.trim().length) {
      setMnemonic(prev => [
        ...prev,
        value.trim()
      ])
      setCurrentInput('')
    } else {
      setCurrentInput(value)
    }
  }

  function handleDelete(index: number) {
    setMnemonic(prev => { 
      const tmp = [...prev]
      tmp.splice(index, 1)
      return tmp
    })
  }

  return (  
    <RecoverView>
      <LargeText>
        Recovery
      </LargeText>

      <MnemonicList
        mnemonic={mnemonic}
        handleDelete={handleDelete}
      />

      <NormalTextInput 
        value={currentInput} 
        onChangeText={(value)=>handleInput(value)} 
        editable={mnemonic.length < MNEMONIC_LENGTH}
        autoCapitalize="none"
      />
      
      <NormalButton onPress={() => {
        router.replace('/')
      }}>
        Back
      </NormalButton>
    </RecoverView>
  );
}

export default RecoverScreen;