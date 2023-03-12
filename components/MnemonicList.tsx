import { FunctionComponent, useReducer } from 'react';

import styled from 'styled-components/native';
import { useMnemonic } from '../context/MnemonicContext';
import mnemonicReducer, { initialState } from '../reducers/mnemonicReducer';

import RecoveryWord from './RecoveryWord';

const MnemonicListView = styled.FlatList`
    
`

interface MnemonicListProps {
    // mnemonic: string[];
    // handleDelete: (index: number) => void
}

const MnemonicList: FunctionComponent<MnemonicListProps> = () => {   
  const { state } = useMnemonic();

  const { mnemonic } = state;

  return (  
      <MnemonicListView
        data={mnemonic}
        renderItem={({ item, index }) => <RecoveryWord key={index} index={index}>{item}</RecoveryWord>}
        numColumns={3}
      />
  );
}

export default MnemonicList;