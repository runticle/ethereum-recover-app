import { FunctionComponent, useEffect, useState } from 'react';

import styled from 'styled-components/native';
import { Container } from '../../components/Globals';

import { Stack } from 'expo-router';
import { useMnemonic } from '../../context/MnemonicContext';
import { getSecuredItem } from '../../utils/secureStoreUtils';
import Revealer from '../../components/Revealer';
import { bigNumInEth, getBalanceFromWallet } from '../../utils/ethersUtils';

const WalletView = styled(Container)`
  align-items: center;
`

const WalletScreen: FunctionComponent = () => {
  const { state } = useMnemonic()

  const [privateKey, setPrivateKey] = useState('')
  const [balance, setBalance] = useState('')

  const { wallet } = state;

  useEffect(() => {
    if(wallet?.address) {
      getSecuredItem(wallet?.address).then((value) => setPrivateKey(value))
      getBalanceFromWallet(wallet.address).then((balance) => setBalance(bigNumInEth(balance)))
    }

  }, [wallet.address])

  return (  
    <WalletView>
      <Stack.Screen options={{ title: 'Wallet', gestureEnabled: false }} />
      <Revealer title="Address" textToHide={wallet?.address} />
      <Revealer title="Balance" textToHide={balance} />
      <Revealer title="Private Key" textToHide={privateKey} />
    </WalletView>
  );
}

export default WalletScreen;