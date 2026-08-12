import { useAppSelector } from "../hooks/redux"
import type { ICity } from "../models/ICommon"
import CityCard from "./CityCard"

const CityContainer = () => {
    const cities: ICity[] = useAppSelector(state => state.citiesReducer.cities)
    console.log(cities)
    return (
        <div className="city__list">
            {cities.map(city =>
                <CityCard key={city.id} city={city} />
            )}
        </div>
    )
}

export default CityContainer