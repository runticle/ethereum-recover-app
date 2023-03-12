import React, { FunctionComponent } from 'react'
import { GestureResponderEvent, TouchableOpacity } from 'react-native/types';
import styled from "styled-components/native";
import { Colours } from '../Globals';

import NormalText from '../Text/NormalText';

const ButtonView = styled.TouchableOpacity`
    align-items: center;
    background-color: ${Colours.white};
    width: 100%;
    padding: 20px;
    border-radius: 20px;
`

interface ButtonProps {
    onPress: ((event: GestureResponderEvent) => void);
    children: React.ReactNode;
}

const BaseButton: FunctionComponent<ButtonProps> = (props) => {
    return <ButtonView onPress={props.onPress} {...props}>
        <NormalText>
            {props.children}
        </NormalText>
    </ButtonView>
}

export default BaseButton;