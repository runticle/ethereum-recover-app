import { FunctionComponent, useReducer } from 'react';

import styled from 'styled-components/native';
import { useWallet } from '../context/WalletContext';
import walletReducer, { initialState } from '../reducers/walletReducer';

import RecoveryWord from './RecoveryWord';
import LargeText from './Text/LargeText';

const MnemonicListView = styled.FlatList`
    margin-top: 10px;
`

interface MnemonicListProps {
  
}

const MnemonicList: FunctionComponent<MnemonicListProps> = () => {   
  const { state } = useWallet();

  const { mnemonic } = state;

  return (
    <>
      <LargeText>Your recovery phrase</LargeText>
      <MnemonicListView
        data={mnemonic}
        renderItem={({ item, index }) => <RecoveryWord key={index} index={index}>{item}</RecoveryWord>}
        numColumns={3}
      />
    </>
  );
}

export default MnemonicList;