import * as SecureStore from 'expo-secure-store';

// TODO Create a SecureStore reducer and handle errors

async function saveSecurely(key: string, value: string) : Promise<void> {
    await SecureStore.setItemAsync(key, value)
    console.log(key + " saved in storage")
}

async function getSecuredItem(key: string) : Promise<string> {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    } else {
        throw new Error('We could not retrieve from Secure Storage.');
    }
}

async function deleteSecuredItem(key: string) : Promise<void> {
    try {
        await SecureStore.deleteItemAsync(key)
        console.log("Deleted " + key + " from secure store")
    } catch (error) {
        console.error(error)
    }
}

export {
    saveSecurely,
    getSecuredItem,
    deleteSecuredItem,
}