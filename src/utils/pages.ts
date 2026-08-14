export const getPages = (totalCount: number, limit: number) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages: number) => {
    const arr = []
    for (let i = 0; i < totalPages; i++) {
        arr.push(i + 1)
    }
    return arr
}