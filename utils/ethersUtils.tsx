import "@ethersproject/shims";
import { Wallet } from 'ethers';

function getWalletFromMnemonic(phrase: string) : Wallet {
    const wallet = Wallet.fromMnemonic(phrase)

    return wallet;
}

export {
    getWalletFromMnemonic,
}