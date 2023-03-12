import { Wallet } from "ethers";
import types from "./types";

export const initialState = {
    mnemonic: ['example'],
    loading: false,
    error: null,
    wallet: {
        address: null
    },
}

export type MnemonicState = {
    mnemonic: string[];
    loading: boolean;
    error: string;
    wallet: {
        address: string;
    };
}

export type MnemonicAction = {
    type: string;
    payload: string | number | Wallet;
}

function mnemonicReducer(state: MnemonicState, action: MnemonicAction) {
    switch(action.type) {
        case types.ADD_WORD:
            return {
                ...state,
                mnemonic: [...state.mnemonic, action.payload]
            }
        case types.REMOVE_WORD:
            const tmp = [...state.mnemonic]

            tmp.splice(Number(action.payload), 1) // force number

            return { 
                ...state,
                mnemonic: tmp 
            }

        case types.RECOVER_WALLET_START:
            return {
                ...state,
                loading: true,
                error: false,
                wallet: {
                    address: null
                },
            }
        case types.RECOVER_WALLET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                wallet: {
                    address: null
                },
            }
        case types.RECOVER_WALLET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                wallet: {
                    ...state.wallet,
                    address: action.payload,
                } 
            }
        default:
            return state;
    }
}

export default mnemonicReducer