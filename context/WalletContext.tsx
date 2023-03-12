import React, { useReducer } from "react"
import walletReducer, { initialState, WalletAction, WalletState } from "../reducers/walletReducer"

interface WalletContextType {
  state: WalletState;
  dispatch: React.Dispatch<WalletAction>;
}

const WalletContext = React.createContext<WalletContextType | null>(null)

export function useWallet() {
  const context = React.useContext(WalletContext)

  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider.");
  }
  return context;
}

function WalletProvider({children}: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(walletReducer, initialState);
  
  const walletState = { state, dispatch };

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider