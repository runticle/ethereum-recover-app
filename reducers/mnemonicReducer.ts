import { Wallet } from "ethers";
import types from "./types";

export const initialState = {
    mnemonic: ['example'],
    loading: false,
    error: null,
    wallet: null,
}

export type MnemonicState = {
    mnemonic: string[];
    loading: boolean;
    error: string;
    wallet: Wallet;
}

export type MnemonicAction = {
    type: string;
    payload: string | number | Wallet;
}

function mnemonicReducer(state: MnemonicState, action: MnemonicAction) {
    switch(action.type) {
        case types.ADD_WORD:
            return {
                mnemonic: [...state.mnemonic, action.payload]
            }
        case types.REMOVE_WORD:
            const tmp = [...state.mnemonic]

            tmp.splice(Number(action.payload), 1) // force number

            return { mnemonic: tmp }

        case types.RECOVER_WALLET_START:
            return {
                ...state,
                loading: true,
                error: false,
                wallet: null,
            }
        case types.RECOVER_WALLET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                wallet: null,
            }
        case types.RECOVER_WALLET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                wallet: action.payload,
            }
        default:
            return state;
    }
}

export default mnemonicReducer