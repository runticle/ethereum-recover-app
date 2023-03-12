import { FunctionComponent, useEffect, useState } from 'react';

import styled from 'styled-components/native';
import { Container } from '../../components/Globals';
import { Alert } from 'react-native';

import { Stack, useRouter } from 'expo-router';
import { useWallet } from '../../context/WalletContext';
import { getSecuredItem } from '../../utils/secureStoreUtils';
import Revealer from '../../components/Revealer';
import { bigNumInEth, getBalanceFromWallet } from '../../utils/ethersUtils';
import types from '../../reducers/types';
import NormalText from '../../components/Text/NormalText';
import SecondaryButton from '../../components/Buttons/SecondaryButton';
import { deleteItemAsync } from 'expo-secure-store';
import { SECURE_STORAGE_KEY } from '@env';

const WalletView = styled(Container)`

`

const WalletScreen: FunctionComponent = () => {
  const { state, dispatch } = useWallet()
  const router = useRouter()

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

  const askLockWallet = () : void => {
    Alert.alert(
      "Lock Wallet",
      "All information regarding your wallet will be removed from this device. It is up to you to recover your wallet with your 12-word recovery phrase. Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "I'm sure",
          style: 'destructive',
          onPress: askLockWalletAgain
        }
      ]
    )
  }

  const askLockWalletAgain = () : void => {
    Alert.alert(
      "Are you sure?",
      "You will lose everything if you do not have your seed backed up.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "I'm 100% sure",
          style: 'destructive',
          onPress: lockWallet
        }
      ]
    )
  }

  const lockWallet = async () : Promise<void> => {
    await deleteItemAsync(SECURE_STORAGE_KEY)
    router.replace('/')
    dispatch({ type: types.RESET })
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
      <Revealer title="Balance" textToHide={"ETH " + balance} />
      <Revealer title="Private Key" textToHide={privateKey} />
      <SecondaryButton onPress={askLockWallet}>Lock Wallet</SecondaryButton>
    </WalletView>
  );
}

export default WalletScreen;