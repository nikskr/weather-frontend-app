import React, { useState } from "react"
import { useAppSelector } from "../hooks/redux"
import type { ICity } from "../models/ICommon"
import CityCard from "./CityCard"

const CityContainer = () => {
    const cities: ICity[] = useAppSelector(state => state.citiesReducer.cities)
    const [maxFavorites, setMaxFavorites] = useState(3)
    const [maxAllCities, setMaxAllCities] = useState(10)

    function handleMaxFavoriteChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setMaxFavorites(Number(e.target.value))
    }

    function handleMaxAllCitiesChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setMaxAllCities(Number(e.target.value))
    }

    console.log(cities)
    return (
        <>
            <div className="city__list">
                <div>
                    <h2>Favorites:</h2>
                    <div>
                        <label>Limit:</label>
                        <select value={maxFavorites} onChange={handleMaxFavoriteChange}>
                            {[1, 2, 3, 4, 5].map(num =>
                                <option key={num} value={num}>{num}</option>
                            )}
                        </select>
                    </div>
                </div>
                {cities.filter(city => city.isFavorite).map((city, i) => {
                    if (i < maxFavorites) {
                        return <CityCard key={city.id} city={city} />
                    }
                }
                )}
            </div>
            <div className="city__list">
                <h2>All cities:</h2>
                <div>
                    <label>Limit:</label>
                    <select value={maxAllCities} onChange={handleMaxAllCitiesChange}>
                        {[3, 5, 10, 15, 25].map(num =>
                            <option key={num} value={num}>{num}</option>
                        )}
                    </select>
                </div>
                {cities.map((city, i) => {
                    if (i < maxAllCities) {
                        return <CityCard key={city.id} city={city} />
                    }
                }
                )}
            </div>
        </>
    )
}

export default CityContainer