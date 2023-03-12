import React, { FunctionComponent } from 'react'
import {  TextInputProps } from 'react-native/types';
import styled from 'styled-components/native'
import { Colours } from '../Globals';
import LargeText from './LargeText';

const NormalTextInputView = styled.TextInput<CustomTextInputProps>`
    margin-top: ${(props) => props.title ? "10px" : 0};
    height: 50px;
    background-color: ${Colours.white};
    color: ${Colours.orange};
    padding-left: 5px;
`

interface CustomTextInputProps extends TextInputProps{
    title: string;
}

const NormalTextInput: FunctionComponent<CustomTextInputProps> = (props) => {
    return (
        <>
            { props.title ? <LargeText>{props.title}</LargeText> : null }
            <NormalTextInputView
                {...props} 
                keyboardType="default"
            />
        </>
    )
}

export default NormalTextInput;