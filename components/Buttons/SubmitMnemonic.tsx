import { Wallet } from 'ethers';
import React, { FunctionComponent } from 'react'
import { useMnemonic } from '../../context/MnemonicContext';
import types from '../../reducers/types';
import cleanMnemonic from '../../utils/cleanMnemonic';
import { getWalletFromMnemonic } from '../../utils/ethersUtils';
import { saveSecurely } from '../../utils/secureStoreUtils';
import BaseButton from './BaseButton';

const SubmitMnemonic: FunctionComponent = (props) => {
    const { state, dispatch } = useMnemonic()
    
    const { mnemonic } = state;
    
    async function onSubmit() {
        const cleanedMnemonic = cleanMnemonic(mnemonic)
    
        if(cleanedMnemonic.length < 12) {
          // ! error
        }
    
        const mnemonicString = mnemonic.join(' ')
    
        let address: string;
    
        try { 
            dispatch({ type: types.RECOVER_WALLET_START, payload: null })
            
            setTimeout(async () => {
                const wallet = getWalletFromMnemonic(mnemonicString)

                address = wallet.address;
                const privateKey = wallet.privateKey;

                await saveSecurely(address, privateKey)

                dispatch({ type: types.RECOVER_WALLET_SUCCESS, payload: address })
            }, 0)
        } catch(error) {
            console.error(error)
            dispatch({ type: types.RECOVER_WALLET_ERROR, payload: error.message })
        }
      }

      
    return <BaseButton onPress={onSubmit} {...props}>
        Submit
    </BaseButton>
}

export default SubmitMnemonic;