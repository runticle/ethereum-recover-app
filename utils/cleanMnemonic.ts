function cleanMnemonic(array: string[]): string[] {
    return array.map(string => string.replace(/[^a-zA-Z]/g, '').toLocaleLowerCase().trim())
}

export default cleanMnemonic