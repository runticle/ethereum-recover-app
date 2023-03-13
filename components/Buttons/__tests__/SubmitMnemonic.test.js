import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useWallet } from '../../../context/WalletContext';
import types from '../../../reducers/types';
import SubmitMnemonic from '../SubmitMnemonic';
import { SECURE_STORAGE_KEY } from '../../Globals';

// TODO These tests aren't working properly.
// TODO The mocks are not working as expected.

const getWalletFromMnemonicSpy = jest.spyOn(
    require('../../../utils/ethersUtils'),
    'getWalletFromMnemonic'
);
const saveSecurelySpy = jest.spyOn(
    require('../../../utils/secureStoreUtils'),
    'saveSecurely'
);

// Mock the useWallet hook
jest.mock('../../../context/WalletContext');
jest.mock('../../../utils/secureStoreUtils', () => ({
    saveSecurely: jest.fn(),
}));

jest.mock('../../../utils/ethersUtils', () => ({
    getWalletFromMnemonic: jest.fn(() => ({
        address: '0x123abc',
        privateKey: '123abc',
    })),
}));

// Mock the saveSecurely function

describe('SubmitMnemonic', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should call onSubmit when the button is pressed', async () => {
        // Mock the useWallet hook to return an initial state
        useWallet.mockReturnValue({
            state: {
                mnemonic: [
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
                ],
            },
            dispatch: jest.fn(),
        });

        // Render the component and simulate pressing the button
        const { getByText } = render(<SubmitMnemonic />);
        fireEvent.press(getByText('Submit'));

        await waitFor(() => {
            // Expect the dispatch function to be called with the RECOVER_WALLET_START action type
            expect(useWallet().dispatch).toHaveBeenCalledWith({
                type: types.RECOVER_WALLET_START,
                payload: null,
            });

            // Expect the getWalletFromMnemonic function to have been called with the correct mnemonic
            expect(getWalletFromMnemonicSpy).toHaveBeenCalledWith(
                'word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12'
            );
            expect(saveSecurelySpy).toHaveBeenCalledWith(
                SECURE_STORAGE_KEY,
                '123abc'
            );
            expect(useWallet().dispatch).toHaveBeenCalledWith({
                type: types.RECOVER_WALLET_SUCCESS,
                payload: '0x123abc',
            });
        });
    });
});
