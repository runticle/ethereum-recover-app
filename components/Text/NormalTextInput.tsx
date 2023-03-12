import React, { FunctionComponent } from 'react'
import {  TextInputProps } from 'react-native/types';
import styled from 'styled-components/native'
import { Colours } from '../Globals';

const NormalTextInputView = styled.TextInput`
    height: 100px;
    width: 100%;
    background-color: ${Colours.white};
    color: ${Colours.orange};
`

const NormalTextInput: FunctionComponent<TextInputProps> = (props) => {
    return (
        <NormalTextInputView
            {...props} 
            keyboardType="default"
        />
    )
}

export default NormalTextInput;