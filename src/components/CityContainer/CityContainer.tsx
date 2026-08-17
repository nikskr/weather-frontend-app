import React, { useMemo, useState } from "react"
import { useAppSelector } from "../../hooks/redux"
import type { ICity } from "../../models/ICommon"
import CityCard from "../CityCard/CityCard"
import classes from './CityContainer.module.css'
import { getPages, getPagesArray } from "../../utils/pages"

interface CityContainerProps {
    isFavorites: boolean
}

const CityContainer = ({ isFavorites }: CityContainerProps) => {
    const allCities: ICity[] = useAppSelector(state => state.citiesReducer.cities)

    const cities = isFavorites ? allCities.filter(c => c.isFavorite) : allCities

    const totalCount = cities.length
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(isFavorites ? 3 : 10)

    const limitArray = isFavorites ? [1, 2, 3, 4, 5] : [3, 5, 10, 15, 25]

    const totalPages = getPages(totalCount, limit)

    const pagesArray = useMemo(() => {
        return getPagesArray(totalPages)
    }, [totalPages])

    const changePage = (page: number) => {
        setPage(page)
    }

    const pageCities = [...cities.slice((page - 1) * limit, (page - 1) * limit + limit)]

    function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setLimit(Number(e.target.value))
        setPage(1)
    }

    if (isFavorites && cities.findIndex(city => city.isFavorite === true) === -1) {
        return (
            <div className={classes.container}>
                <h2 className={classes.cap}>No favorite locations. Click like to add</h2>
            </div>
        )
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.titleWrapper}>
                    <h2>{isFavorites ? 'Favorites:' : 'All cities:'}</h2>
                    <div>
                        <select className={classes.select} value={limit} onChange={handleLimitChange}>
                            <option disabled>Limit:</option>
                            {limitArray.map(num =>
                                <option key={num} value={num}>{num}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className={classes.list}>
                    {pageCities.map((city, i) => {
                        if (i < limit) {
                            return <CityCard key={city.id} city={city} pageCities={pageCities} changePage={changePage} />
                        }
                    })}
                </div>
                <div className={classes.pagesWrapper}>
                    {pagesArray.map(p =>
                        <div onClick={() => changePage(p)} className={p === page ? classes.pageBtn + ' ' + classes.pageCurrent : classes.pageBtn} key={p}>{p}</div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CityContainer