import React, { useState } from "react"
import CityCard from "../CityCard/CityCard"
import classes from './CityContainer.module.css'
import { StorageService } from "../../service/StorageService"
import { usePageCities } from "../../hooks/usePageCities"

interface CityContainerProps {
    isFavorites: boolean
}

const CityContainer = ({ isFavorites }: CityContainerProps) => {

    const limitFromLocalStorage = Number(isFavorites ? StorageService.get('favoritesLimit') : StorageService.get('citiesLimit'))

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(limitFromLocalStorage ? limitFromLocalStorage : 5)

    const {pageCities, limitArray, pagesArray} = usePageCities(isFavorites, page, limit)

    const changePage = (page: number) => {
        setPage(page)
    }

    function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setLimit(Number(e.target.value))
        setPage(1)
        if (isFavorites) {
            StorageService.set('favoritesLimit', e.target.value)
        } else {
            StorageService.set('citiesLimit', e.target.value)
        }
    }

    if (isFavorites && pageCities.findIndex(city => city.isFavorite === true) === -1) {
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