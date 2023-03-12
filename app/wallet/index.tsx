import { FunctionComponent, useEffect, useState } from 'react';

import styled from 'styled-components/native';
import { Container } from '../../components/Globals';
import { Alert } from 'react-native';

import { Stack } from 'expo-router';
import { useWallet } from '../../context/WalletContext';
import { getSecuredItem } from '../../utils/secureStoreUtils';
import Revealer from '../../components/Revealer';
import { bigNumInEth, getBalanceFromWallet } from '../../utils/ethersUtils';
import types from '../../reducers/types';
import NormalText from '../../components/Text/NormalText';

const WalletView = styled(Container)`
  align-items: center;
`

const WalletScreen: FunctionComponent = () => {
  const { state, dispatch } = useWallet()

  const [privateKey, setPrivateKey] = useState('')
  const [balance, setBalance] = useState('')

  const fetchWalletBalance = async (address: string) => {
    try { 
      dispatch({ type: types.FETCH_BALANCE_START, payload: null })
  
      const balance = await getBalanceFromWallet(address)
      
      setBalance(bigNumInEth(balance))

      dispatch({ type: types.FETCH_BALANCE_SUCCESS, payload: address })
  } catch(error) {
      console.error(error)
      dispatch({ type: types.FETCH_BALANCE_ERROR, payload: error.message })
  }
  }

  const { wallet } = state;

  useEffect(() => {
    if(state.error) {
      Alert.alert('Something went wrong', state.error)
    }

    if(wallet?.address) {
      getSecuredItem(wallet.address).then((value) => setPrivateKey(value))
      fetchWalletBalance(wallet.address)
    }

  }, [wallet.address, state.error])

  if(state.loading) return <NormalText>Loading...</NormalText>

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