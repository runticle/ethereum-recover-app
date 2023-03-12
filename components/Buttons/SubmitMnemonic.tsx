import React, { FunctionComponent } from 'react'
import { useWallet } from '../../context/WalletContext';
import types from '../../reducers/types';
import cleanMnemonic from '../../utils/cleanMnemonic';
import { getWalletFromMnemonic } from '../../utils/ethersUtils';
import { saveSecurely } from '../../utils/secureStoreUtils';
import BaseButton from './BaseButton';

import { SECURE_STORAGE_KEY } from "@env";

const SubmitMnemonic: FunctionComponent = (props) => {
    const { state, dispatch } = useWallet()
    
    const { mnemonic } = state;
    
    async function onSubmit() {
        dispatch({ type: types.RECOVER_WALLET_START, payload: null })

        const cleanedMnemonic = cleanMnemonic(mnemonic)
    
        if(cleanedMnemonic.length !== 12) {
          dispatch({type: types.RECOVER_WALLET_ERROR, payload: `Expected 12-word mnemonic. Recieved ${cleanedMnemonic.length} words. Please check your input.`})
        }
    
        const mnemonicString = mnemonic.join(' ')
    
        let address: string;
        
        // ! getWalletFromMnemonic takes a long time to execute. Using setTimout, 0 to avoid the UI freezing on the main thread.
        setTimeout(async () => {
            try { 
                const wallet = getWalletFromMnemonic(mnemonicString)

                address = wallet.address;
                const privateKey = wallet.privateKey;

                await saveSecurely(SECURE_STORAGE_KEY, privateKey)

                dispatch({ type: types.RECOVER_WALLET_SUCCESS, payload: address })

                } catch(error) {
                    dispatch({ type: types.RECOVER_WALLET_ERROR, payload: `Failed to recover wallet from provided recovery phrase. Please check your input and try again. Error: ${error.message}` })
                }
            }, 0)
        } 

      
    return <BaseButton onPress={onSubmit} {...props}>
        Submit
    </BaseButton>
}

export default SubmitMnemonic;