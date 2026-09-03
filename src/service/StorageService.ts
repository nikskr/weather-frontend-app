export const StorageService = {
    get<T> (key: string): T | undefined {
        try {
            const item = localStorage.getItem(key)
            if (item === null) return undefined
            return JSON.parse(item) as T
        } catch (error) {
            console.error('Storage Service - Key reading Error: ', error)
        }
    },
    set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error('Storage Service - Value setting Error: ', error)
        }
    },
    // remove(key: string): void {
    //     try {
    //         localStorage.removeItem(key)
    //     } catch (error) {
    //         console.error('Storage Service - Key removing Error: ', error)
    //     }
    // }
}