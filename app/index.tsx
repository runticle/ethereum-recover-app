import React, { FunctionComponent, useEffect } from 'react';

import styled from 'styled-components/native';
import { Container } from '../components/Globals';
import NormalButton from '../components/Buttons/BaseButton';
import LargeText from '../components/Text/LargeText';
import NormalText from '../components/Text/NormalText';

import { Stack, useRouter } from 'expo-router';
import { useWallet } from '../context/WalletContext';

const HomeView = styled(Container)`
    justify-content: space-between;
    align-items: center;
`;

const HomeScreen: FunctionComponent = () => {
    const router = useRouter();

    const { state } = useWallet();

    let buttonText = '';
    let buttonPath = '';
    let descriptiveText = [];

    if (state.wallet?.address) {
        buttonText = 'Go to Wallet';
        buttonPath = '/wallet';
        descriptiveText = [
            'It looks like you have a wallet already setup.',
            "Tap 'Go To Wallet' to see your current balance.",
        ];
    } else {
        buttonText = 'Recover Wallet';
        buttonPath = '/recover';
        descriptiveText = [
            "Let's recover your ethereum wallet.",
            'Have your mnemoic phrase ready. This is yor 12 word recovery phrase. Never share this with anyone.',
            'Ensure you are in a secure location and no one is able to see your phone.',
            'Tap the button below to start.',
        ];
    }

    return (
        <HomeView>
            <Stack.Screen options={{ headerShown: false }} />
            <LargeText>YourWallet</LargeText>
            {descriptiveText.map((line, index) => (
                <NormalText key={index}>{line}</NormalText>
            ))}
            <NormalButton onPress={() => router.push(buttonPath)}>
                {buttonText}
            </NormalButton>
        </HomeView>
    );
};

export default HomeScreen;
