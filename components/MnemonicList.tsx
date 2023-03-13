import React from 'react';

import { FunctionComponent } from 'react';

import styled from 'styled-components/native';
import { useWallet } from '../context/WalletContext';
import { MNEMONIC_LENGTH } from './Globals';

import RecoveryWord from './RecoveryWord';
import LargeText from './Text/LargeText';

const MnemonicListView = styled.FlatList`
    margin-top: 10px;
`;

interface MnemonicListProps {}

const MnemonicList: FunctionComponent<MnemonicListProps> = () => {
    const { state } = useWallet();

    const { mnemonic } = state;

    return (
        <>
            <LargeText>{`${MNEMONIC_LENGTH - state.mnemonic.length} word${
                MNEMONIC_LENGTH - state.mnemonic.length === 1 ? '' : 's'
            } left`}</LargeText>
            <MnemonicListView
                data={mnemonic}
                renderItem={({ item, index }) => (
                    <RecoveryWord key={index} index={index}>
                        {item}
                    </RecoveryWord>
                )}
                numColumns={3}
            />
        </>
    );
};

export default MnemonicList;
