import React, { FunctionComponent } from "react";
import { GestureResponderEvent } from "react-native/types";
import styled from "styled-components/native";
import { Colours } from "./Globals";
import NormalText from "./Text/NormalText";

const RecoveryWordView = styled.View`
    min-width: 31%;
    margin: 1%;
    background-color: ${Colours.white};
    border-radius: 10px;

    display: flex;
    flex-direction: row;
`

const DeleteView = styled.TouchableOpacity`
    background-color: ${Colours.black};
    color: ${Colours.orange};
`

interface RecoveryWordProps {
    children: React.ReactNode;
    onPressDelete: (event: GestureResponderEvent) => void;
}

const RecoveryWord: FunctionComponent<RecoveryWordProps> = (props) => {
    return (
        <RecoveryWordView>
            <DeleteView onPress={props.onPressDelete}><NormalText>X</NormalText></DeleteView>
            <NormalText textStyle={{paddingLeft: 5}}>
                {props.children}
            </NormalText>
        </RecoveryWordView>
    )
}

export default RecoveryWord;