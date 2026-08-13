import { useNavigate } from "react-router"
import { useAppDispatch } from "../../hooks/redux"
import type { ICity } from "../../models/ICommon"
import { weatherAPI } from "../../service/WeatherService"
import { citiesSlice } from "../../store/reducers/CitiesSlice"
import classes from './CityCard.module.css'
import LikeButton from "../UI/LikeButton/LikeButton"

interface CityCardProps {
    city: ICity
}

const CityCard = ({ city }: CityCardProps) => {
    const { bringToTop, toggleFavorite } = citiesSlice.actions
    const { data: weatherData, isLoading, error } = weatherAPI.useFetchCurrentWeatherByLocationQuery(city.name)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
            <div onClick={handleOnCardClick} className={classes.cityItem}>
                <div className={classes.header}>
                    <h3 className={classes.headerName}>{city.name}</h3>
                    <LikeButton handleLikeClick={e => handleFavoriteBtnClick(e, city)} isLiked={Boolean(city.isFavorite)} />
                </div>
                <div>
                    {/* <h4>{weatherData.current.condition.text}</h4>
                    <img src={weatherData.current.condition.icon}/> */}
                </div>
                <h4>Temperature: {weatherData.current.temp_c}</h4>
                <div>Humidity: {weatherData.current.humidity}</div>
            </div >
        </>
    )
}

export default CityCard