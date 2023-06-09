import React, { FunctionComponent, useEffect, useState } from 'react';

import { Alert } from 'react-native';

import styled from 'styled-components/native';
import { Container, MNEMONIC_LENGTH } from '../../components/Globals';

import { Stack, useNavigation, useRouter } from 'expo-router';
import NormalTextInput from '../../components/Text/NormalTextInput';
import MnemonicList from '../../components/MnemonicList';

import types from '../../reducers/types';

import { useWallet } from '../../context/WalletContext';
import SubmitMnemonic from '../../components/Buttons/SubmitMnemonic';
import NormalText from '../../components/Text/NormalText';
import Loading from '../../components/Loading';

const RecoverView = styled(Container)``;

const RecoverScreen: FunctionComponent = () => {
    const [currentInput, setCurrentInput] = useState('');
    const router = useRouter();
    const navigation = useNavigation();

    const { state, dispatch } = useWallet();

    const { mnemonic } = state;

    function handleAddWord(value: string) {
        dispatch({ type: types.ADD_WORD, payload: value });
    }

    function handleInput(value: string, submit = false) {
        const lastInput = value.charAt(value.length - 1);

        value = value.toLocaleLowerCase().trim();

        // User can either press the submit button to add a word
        // or if they press space, we will also add the word.
        if ((submit || lastInput === ' ') && value.trim().length) {
            handleAddWord(value);
            setCurrentInput('');
        } else {
            setCurrentInput(value);
        }
    }

    const inputComplete = mnemonic.length === MNEMONIC_LENGTH;

    useEffect(() => {
        if (state.error) {
            Alert.alert('Something went wrong', state.error);
        }

        // * Look out for the presence of a wallet in our reducer. If we find one, we will head to the wallet screen
        if (state.wallet?.address) {
            router.replace('/wallet');
        }

        const unsubscribe = navigation.addListener('beforeRemove', () => {
            dispatch({ type: types.RESET });
        });

        return unsubscribe;
    }, [state.wallet?.address, state.error, navigation]);

    return (
        <RecoverView>
            <Stack.Screen options={{ title: 'Recovery' }} />
            <NormalText>
                Enter your 12 word recovery phrase. Be sure to enter the words
                in the correct order.
            </NormalText>
            <MnemonicList />
            {!inputComplete ? (
                <NormalTextInput
                    title="Enter next word"
                    value={currentInput}
                    onChangeText={(value) => handleInput(value)}
                    editable={!inputComplete}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Tap submit or space between each word"
                    blurOnSubmit={false}
                    onSubmitEditing={(event) => {
                        handleInput(event.nativeEvent.text, true);
                    }}
                />
            ) : (
                <SubmitMnemonic />
            )}
            <Loading show={state.loading} />
        </RecoverView>
    );
};

export default RecoverScreen;
