import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { Colours } from "./Globals";
import NormalText from "./Text/NormalText";

import types from '../reducers/types';
import { useWallet } from "../context/WalletContext";

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
    index: number
}

const RecoveryWord: FunctionComponent<RecoveryWordProps> = (props) => {
    const { dispatch } = useWallet();

    function handleRemoveWord() {
      dispatch({ type: types.REMOVE_WORD, payload: props.index });
    }
  
    return (
        <RecoveryWordView>
            <DeleteView onPress={handleRemoveWord}><NormalText>X</NormalText></DeleteView>
            <NormalText textStyle={{paddingLeft: 5}}>
                {props.children}
            </NormalText>
        </RecoveryWordView>
    )
}

export default RecoveryWord;