import { FunctionComponent } from 'react';

import styled from 'styled-components/native';
import RecoveryWord from './RecoveryWord';

const MnemonicListView = styled.FlatList`
    
`

interface MnemonicListProps {
    mnemonic: string[];
    handleDelete: (index: number) => void
}

const MnemonicList: FunctionComponent<MnemonicListProps> = ({mnemonic, handleDelete}) => {    
  return (  
      <MnemonicListView
        data={mnemonic}
        renderItem={({ item, index }) => <RecoveryWord onPressDelete={() => handleDelete(index)}>{item}</RecoveryWord>}
        numColumns={3}
      />
  );
}

export default MnemonicList;