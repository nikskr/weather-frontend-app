import { useMemo } from "react"
import { getPages, getPagesArray } from "../utils/pages"
import type { ICity } from "../models/ICommon"
import { useAppSelector } from "./redux"

export const usePageCities = (isFavorites: boolean, page: number, limit: number) => {
    const allCities: ICity[] = useAppSelector(state => state.citiesReducer.cities)

    const cities = isFavorites ? allCities.filter(c => c.isFavorite) : allCities

    const totalCount = cities.length

    const totalPages = getPages(totalCount, limit)

    const pageCities = [...cities.slice((page - 1) * limit, (page - 1) * limit + limit)]

    const limitArray = isFavorites ? [1, 2, 3, 4, 5] : [3, 5, 10, 15, 25]

    const pagesArray = useMemo(() => {
        return getPagesArray(totalPages)
    }, [totalPages])

    return {pageCities, limitArray, pagesArray}
} 