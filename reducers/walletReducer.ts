import types from "./types";

export const initialState = {
    mnemonic: ['example'],
    loading: false,
    error: null,
    wallet: {
        address: null,
        balance: null,
    },
}

export type WalletState = {
    mnemonic: string[];
    loading: boolean;
    error: string;
    wallet: {
        address: string | null;
        balance: string | null;
    };
}

export type WalletAction = {
    type: string;
    payload?: string | number;
}

function walletReducer(state: WalletState, action: WalletAction) {
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
                    ...state.wallet,
                    address: null,
                    balance: null,
                },
            }
        case types.RECOVER_WALLET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                wallet: {
                    ...state.wallet,
                    address: null,
                    balance: null,
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

        case types.FETCH_BALANCE_START:
            return {
                ...state,
                loading: true,
                error: false,
                wallet: {
                    ...state.wallet,
                    balance: null,
                },
            }
        case types.FETCH_BALANCE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                wallet: {
                    ...state.wallet,
                    address: null,
                    balance: null,
                },
            }
        case types.FETCH_BALANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                wallet: {
                    ...state.wallet,
                    balance: action.payload,
                } 
            }

        case types.RESET:
            return initialState;
        default:
            return state;
    }
}

export default walletReducer