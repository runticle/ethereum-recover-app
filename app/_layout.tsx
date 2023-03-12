import { Stack } from "expo-router";
import WalletProvider from "../context/WalletContext";

export default function Layout() {
return (
    <WalletProvider>
        <Stack />
    </WalletProvider>
)
}