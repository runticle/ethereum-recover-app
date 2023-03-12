import { FunctionComponent } from 'react';

import styled from 'styled-components/native';
import { Container } from '../components/Globals';
import NormalButton from '../components/Buttons/BaseButton';
import LargeText from '../components/Text/LargeText';
import NormalText from '../components/Text/NormalText';

import { Stack, useRouter } from 'expo-router';

const HomeView = styled(Container)`
  justify-content: space-between;
  align-items: center;
`

const HomeScreen: FunctionComponent = () => {
  const router = useRouter()

  return (  
    <HomeView>
      <Stack.Screen options={{headerShown: false}} />
      <LargeText>
        YourWallet
      </LargeText>
      <NormalText>
          Let's recover your ethereum wallet.
          Have your mnemoic phrase ready. (What's this?)
          Ensure you are in a secure location and no one is able to see your phone.
          Tap the button below to start.
      </NormalText>
      <NormalButton onPress={() => router.push('/recover')}>
        Recover Wallet
      </NormalButton>
    </HomeView>
  );
}

export default HomeScreen;