import React, { FunctionComponent } from 'react'
import { GestureResponderEvent } from 'react-native/types';
import styled from "styled-components/native";

import NormalText from './Text/NormalText';

const ButtonView = styled.TouchableOpacity`
    align-items: center;
    background-color: red;
    width: 100%;
    padding: 20px;
    border-radius: 20px;
`

interface ButtonProps {
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    children: React.ReactNode;
}

const NormalButton: FunctionComponent<ButtonProps> = (props) => {
    return <ButtonView>
        <NormalText>
            {props.children}
        </NormalText>
    </ButtonView>
}

export default NormalButton;