export function isArrayEmpty(array: any[] | undefined) {
    return array === undefined || array.length === 0
}

export function isObjectEmpty(object: any | undefined) {
    if (object) {
        const objectKeys = Object.keys(object)
        return isArrayEmpty(objectKeys)
    } else {
        return true
    }
}