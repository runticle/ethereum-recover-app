import "@ethersproject/shims";
import { BigNumber, ethers, Wallet } from 'ethers';

import { ETHERSCAN_API_KEY } from "@env";

function getWalletFromMnemonic(phrase: string) : Wallet {
    const wallet = Wallet.fromMnemonic(phrase)

    return wallet;
}

async function getBalanceFromWallet(address: string) : Promise<BigNumber> {
    const provider = setupProvider()

    const balance = await provider.getBalance(address)

    return balance;
}

function setupProvider() { 
    return new ethers.providers.EtherscanProvider('homestead', ETHERSCAN_API_KEY)
}

export {
    getWalletFromMnemonic,
    getBalanceFromWallet,
}