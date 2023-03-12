import { FunctionComponent } from 'react';

import styled from 'styled-components/native';
import { Container } from '../../components/Globals';

import { Stack, useRouter } from 'expo-router';
import { useMnemonic } from '../../context/MnemonicContext';
import NormalText from '../../components/Text/NormalText';

const WalletView = styled(Container)`
  justify-content: space-between;
  align-items: center;
`

const WalletScreen: FunctionComponent = () => {
  const { state } = useMnemonic()

  const { wallet } = state;

  return (  
    <WalletView>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <NormalText>
        {wallet?.address}
      </NormalText>
    </WalletView>
  );
}

export default WalletScreen;