import types from "./types";

export const initialState = {
    mnemonic: ['example']
}

export type MnemonicState = {
    mnemonic: string[];
}

export type MnemonicAction = {
    type: string;
    payload: string | number;
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
        default:
            return state;
    }
}

export default mnemonicReducer