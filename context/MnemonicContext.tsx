import React, { useReducer } from "react"
import mnemonicReducer, { initialState, MnemonicAction, MnemonicState } from "../reducers/mnemonicReducer"

interface MnemonicContextType {
  state: MnemonicState;
  dispatch: React.Dispatch<MnemonicAction>;
}

const MnemonicContext = React.createContext<MnemonicContextType | null>(null)

export function useMnemonic() {
  const context = React.useContext(MnemonicContext)

  if (context === undefined) {
    throw new Error("useMnemonic must be used within a MnemonicProvider.");
  }
  return context;
}

function MnemonicProvider({children}: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(mnemonicReducer, initialState);
  
  const mnemonicState = [state, dispatch]

  return (
    <MnemonicContext.Provider value={mnemonicState}>
      {children}
    </MnemonicContext.Provider>
  )
}

export default MnemonicProvider