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
    const cities: ICity[] = useAppSelector(state => state.citiesReducer.cities)
    const [maxFavorites, setMaxFavorites] = useState(3)
    const [maxAllCities, setMaxAllCities] = useState(10)

    function handleMaxFavoriteChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setMaxFavorites(Number(e.target.value))
    }

    const totalCount = cities.length
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(isFavorites ? maxFavorites : maxAllCities)
    const [pageCities, setPageCities] = useState<ICity[]>([])

    const totalPages = getPages(totalCount, limit)

    const pagesArray = useMemo(() => {
        return getPagesArray(totalPages)
    }, [totalPages])

    const changePage = (page: number) => {
        setPage(page)
        setPageCities(cities.slice(page * limit - 1, (page * limit + limit)))
        console.log(pageCities) // ERROR PAGINATION
    }


    function handleMaxAllCitiesChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setMaxAllCities(Number(e.target.value))
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
                        {/* <label>Limit:</label> */}
                        {isFavorites ?
                            <select className={classes.select} value={maxFavorites} onChange={handleMaxFavoriteChange}>
                                <option disabled>Limit:</option>
                                {[1, 2, 3, 4, 5].map(num =>
                                    <option key={num} value={num}>{num}</option>
                                )}
                            </select>
                            :
                            <select className={classes.select} value={maxAllCities} onChange={handleMaxAllCitiesChange}>
                                <option disabled>Limit:</option>
                                {[3, 5, 10, 15, 25].map(num =>
                                    <option key={num} value={num}>{num}</option>
                                )}
                            </select>
                        }
                    </div>
                </div>
                <div className={classes.list}>
                    {isFavorites ?
                        cities.filter(city => city.isFavorite).map((city, i) => {
                            if (i < maxFavorites) {
                                return <CityCard isFavoritesContainer={isFavorites} key={city.id} city={city} />
                            }
                        })
                        :
                        cities.map((city, i) => {
                            if (i < maxAllCities) {
                                return <CityCard isFavoritesContainer={isFavorites} key={city.id} city={city} />
                            }
                        })
                    }
                </div>
                <div className={classes.pagesWrapper}>
                    {pagesArray.map(p => 
                        <button onClick={() => changePage(p)}className={p === page ? classes.pageBtn + ' ' + classes.pageCurrent : classes.pageBtn  } key={p}>{p}</button>
                    ) }
                </div>
            </div>
        </>
    )
}

export default CityContainer