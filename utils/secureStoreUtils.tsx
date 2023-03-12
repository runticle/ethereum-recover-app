import * as SecureStore from 'expo-secure-store';

async function saveSecurely(key: string, value: string) {
    await SecureStore.setItemAsync(key, value)
    console.log("saved in storage")
}

async function getSecuredItem(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    } else {
        throw new Error('We could not retrieve from Secure Storage.');
    }
}

export {
    saveSecurely,
    getSecuredItem,
}