import walletReducer, { initialState } from "../walletReducer";
import types from "../types";

describe("walletReducer", () => {
    it("should return the initial state", () => {
        expect(walletReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle ADD_WORD", () => {
        const action = {
            type: types.ADD_WORD,
            payload: "word3",
        };

        const state = {
            mnemonic: ['word1', 'word2'],
            loading: true,
            error: null,
            wallet: {
                address: null,
                balance: null,
            }
        }

        const expectedState = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: true,
            error: null,
            wallet: {
                address: null,
                balance: null,
            }
        };
        expect(walletReducer(state, action)).toEqual(expectedState);
    });

    it("should handle REMOVE_WORD", () => {
        const state = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: true,
            error: null,
            wallet: {
                address: null,
                balance: null,
            }
        };
        const action = {
            type: types.REMOVE_WORD,
            payload: "1",
        };
        const expectedState = {
            mnemonic: ["word1", "word3"],
            loading: true,
            error: null,
            wallet: {
                address: null,
                balance: null,
            }
        };
        expect(walletReducer(state, action)).toEqual(expectedState);
    });

    it("should handle RECOVER_WALLET_START", () => {
        const action = {
            type: types.RECOVER_WALLET_START,
        };
        const state = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: false,
            error: false,
            wallet: {
                address: null,
                balance: null,
            },
        };
        const expectedState = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: true,
            error: false,
            wallet: {
                address: null,
                balance: null,
            },
        };
        expect(walletReducer(state, action)).toEqual(expectedState);
    });

    it("should handle RECOVER_WALLET_ERROR", () => {
        const action = {
            type: types.RECOVER_WALLET_ERROR,
            payload: "Error message",
        };
        const state = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: true,
            error: false,
            wallet: {
                address: null,
                balance: null,
            },
        };
        const expectedState = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: false,
            error: "Error message",
            wallet: {
                address: null,
                balance: null,
            },
        };
        expect(walletReducer(state, action)).toEqual(expectedState);
    });

    it("should handle RECOVER_WALLET_SUCCESS", () => {
        const action = {
            type: types.RECOVER_WALLET_SUCCESS,
            payload: "0x1234",
        };
        const state = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: true,
            error: false,
            wallet: {
                address: null,
                balance: null,
            },
        };
        const expectedState = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: false,
            error: null,
            wallet: {
                address: "0x1234",
                balance: null,
            },
        };
        expect(walletReducer(state, action)).toEqual(expectedState);
    });

    it("should handle FETCH_BALANCE_START", () => {
        const action = {
            type: types.FETCH_BALANCE_START,
        };
        const state = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: false,
            error: "Error",
            wallet: {
                address: null,
                balance: null,
            },
        };
        const expectedState = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: true,
            error: null,
            wallet: {
                address: null,
                balance: null,
            },
        };
        expect(walletReducer(state, action)).toEqual(expectedState);
    });

    it("should handle FETCH_BALANCE_ERROR", () => {
        const action = {
            type: types.FETCH_BALANCE_ERROR,
            payload: "Error message",
        };
        const state = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: true,
            error: false,
            wallet: {
                address: "0x1234",
                balance: null,
            },
        };
        const expectedState = {
            mnemonic: ['word1', 'word2', 'word3'],
            loading: false,
            error: "Error message",
            wallet: {
                address: "0x1234",
                balance: null,
            },
        };
        expect(walletReducer(state, action)).toEqual(expectedState);
    });

    it("should handle FETCH_BALANCE_SUCCESS", () => {
        const action = {
        type: types.FETCH_BALANCE_SUCCESS,
        payload: '59000000',
        };

        const state = {
            mnemonic: ['word1', 'word2'],
            loading: true,
            error: null,
            wallet: {
                address: '0x1234',
                balance: null,
            }
        }

        const expectedState = { 
            mnemonic: ['word1', 'word2'],
            loading: false,
            error: null,
            wallet: {
                address: '0x1234',
                balance: '59000000',
            }
        }

        expect(walletReducer(state, action)).toEqual(expectedState)
    })
})
