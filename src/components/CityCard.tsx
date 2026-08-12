import { useNavigate } from "react-router"
import { useAppDispatch } from "../hooks/redux"
import type { ICity } from "../models/ICommon"
import { currentWeatherAPI } from "../service/CurrentWeatherService"
import { citiesSlice } from "../store/reducers/CitiesSlice"

interface CityCardProps {
    city: ICity
}

const CityCard = ({ city }: CityCardProps) => {
    const { bringToTop, toggleFavorite } = citiesSlice.actions
    const { data: weatherData, isLoading, error } = currentWeatherAPI.useFetchCurrentWeatherByLocationQuery(city.name)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    console.log(weatherData)

    function handleFavoriteBtnClick(e: React.MouseEvent, city: ICity) {
        e.stopPropagation()
        dispatch(toggleFavorite(city))
    }

    if (isLoading) {
        return (
            <div>Loading data...</div>
        )
    }

    if (error || !weatherData) {
        return (
            <div>Error loading data!</div>
        )
    }

    function handleOnCardClick() {
        dispatch(bringToTop(city))
        navigate(city.name)
    }

    return (
        <>
            <div onClick={handleOnCardClick} className="city__item">
            <h3>{city.name}</h3>
            <div>
                {/* <h4>{weatherData.current.condition.text}</h4>
                    <img src={weatherData.current.condition.icon}/> */}
            </div>
            <h4>Temperature: {weatherData.current.temp_c}</h4>
            <div>Humidity: {weatherData.current.humidity}</div>
            <button onClick={e => handleFavoriteBtnClick(e, city)}>{city.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</button>
        </div >
        </>
    )
}

export default CityCard