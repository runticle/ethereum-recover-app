import "@ethersproject/shims";
import { BigNumber, ethers, Wallet } from 'ethers';

import { ETHERSCAN_API_KEY, GANACHE_NETWORK } from "@env";

function getWalletFromMnemonic(phrase: string) : Wallet {
    const wallet = Wallet.fromMnemonic(phrase)

    return wallet;
}

async function getBalanceFromWallet(address: string) : Promise<BigNumber> {
    const provider = setupProvider()

    const balance = await provider.getBalance(address)

    return balance;
}

type ProviderType = ethers.providers.BaseProvider;

function setupProvider() : ProviderType { 
    if(process.env.NODE_ENV === 'development') {
        // * Ganache Chain
        console.log("😇 We are using DEV mode. Make sure you have Ganache running...")
        return ethers.providers.getDefaultProvider(GANACHE_NETWORK);
    } else {
        return new ethers.providers.EtherscanProvider('homestead', ETHERSCAN_API_KEY)
    }
}

function bigNumInEth(bn: BigNumber) : string {
    return ethers.utils.formatEther(bn)
}

export {
    getWalletFromMnemonic,
    getBalanceFromWallet,
    bigNumInEth,
}