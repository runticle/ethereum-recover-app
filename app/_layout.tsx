import { Stack } from "expo-router";
import MnemonicProvider from "../context/MnemonicContext";

export default function Layout() {
return (
    <MnemonicProvider>
        <Stack />
    </MnemonicProvider>
)
}