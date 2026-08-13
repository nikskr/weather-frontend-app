import React, { useState } from "react"
import { useAppSelector } from "../../hooks/redux"
import type { ICity } from "../../models/ICommon"
import CityCard from "../CityCard/CityCard"
import classes from './CityContainer.module.css'

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
                        <label>Limit:</label>
                        {isFavorites ?
                            <select value={maxFavorites} onChange={handleMaxFavoriteChange}>
                                {[1, 2, 3, 4, 5].map(num =>
                                    <option key={num} value={num}>{num}</option>
                                )}
                            </select>
                            :
                            <select value={maxAllCities} onChange={handleMaxAllCitiesChange}>
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
                                return <CityCard key={city.id} city={city} />
                            }
                        })
                        :
                        cities.map((city, i) => {
                            if (i < maxAllCities) {
                                return <CityCard key={city.id} city={city} />
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CityContainer