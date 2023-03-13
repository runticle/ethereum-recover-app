import React from 'react';
import MnemonicList from '../MnemonicList';

import { WalletContext } from '../../context/WalletContext';

import { render } from '@testing-library/react-native';

describe('MnemonicList', () => {
    test('renders the component with the expected text', () => {
        const mnemonic = ['word1', 'word2', 'word3', 'word4', 'word5', 'word6'];
        const { getByText } = render(
            <WalletContext.Provider value={{ state: { mnemonic } }}>
                <MnemonicList />
            </WalletContext.Provider>
        );
        const remainingWordsText = getByText('6 words left');
        expect(remainingWordsText).toBeDefined();
    });
    test('renders the component with the expected text', () => {
        const mnemonic = [
            'word1',
            'word2',
            'word3',
            'word4',
            'word5',
            'word6',
            'word7',
            'word8',
            'word9',
            'word10',
            'word11',
        ];
        const { getByText } = render(
            <WalletContext.Provider value={{ state: { mnemonic } }}>
                <MnemonicList />
            </WalletContext.Provider>
        );
        const remainingWordsText = getByText('1 word left');
        expect(remainingWordsText).toBeDefined();
    });
    test('renders the component with the expected text', () => {
        const mnemonic = [
            'word1',
            'word2',
            'word3',
            'word4',
            'word5',
            'word6',
            'word7',
            'word8',
            'word9',
            'word10',
            'word11',
            'word12',
        ];
        const { getByText } = render(
            <WalletContext.Provider value={{ state: { mnemonic } }}>
                <MnemonicList />
            </WalletContext.Provider>
        );
        const remainingWordsText = getByText('0 words left');
        expect(remainingWordsText).toBeDefined();
    });
});
