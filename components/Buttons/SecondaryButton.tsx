import React, { FunctionComponent } from 'react'
import { GestureResponderEvent } from 'react-native/types';
import styled from "styled-components/native";
import { Colours } from '../Globals';

import NormalText from '../Text/NormalText';

const ButtonView = styled.TouchableOpacity`
    align-items: center;
    width: 100%;
`

interface ButtonProps {
    onPress: ((event: GestureResponderEvent) => void);
    children: React.ReactNode;
}

const SecondaryButton: FunctionComponent<ButtonProps> = (props) => {
    return <ButtonView onPress={props.onPress} {...props}>
        <NormalText textStyle={{
              color: Colours.red,
              fontSize: 13,
        }}>
            {props.children}
        </NormalText>
    </ButtonView>
}

export default SecondaryButton;