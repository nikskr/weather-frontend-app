import { useNavigate } from "react-router"
import { useAppDispatch } from "../../hooks/redux"
import type { ICity } from "../../models/ICommon"
import { weatherAPI } from "../../service/WeatherService"
import { citiesSlice } from "../../store/reducers/CitiesSlice"
import classes from './CityCard.module.css'
import LikeButton from "../UI/LikeButton/LikeButton"
import Loader from "../UI/Loader/Loader"

interface CityCardProps {
    city: ICity,
    pageCities: ICity[],
    changePage: (pageNumber: number) => void;
    scrollHandler: () => void
}

const CityCard = ({ city, pageCities, changePage, scrollHandler }: CityCardProps) => {
    const { bringToTop, toggleFavorite } = citiesSlice.actions
    const requestCityName = pageCities.find(c => c.name.toLowerCase() === city.name.toLowerCase())?.name || city.name

    const { data: weatherData, isLoading, error } = weatherAPI.useFetchCurrentWeatherByLocationQuery(requestCityName)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const firstCity = pageCities[0]

    if (!firstCity) {
        return (
            <h1>First city not found. Error</h1>
        )
    }

    if (isLoading) {
        return (
            <div className={classes.cityItemLayout}>
                <div className={`${classes.cityItem} ${city.name === firstCity.name ? classes.first : ''}`}>
                    <Loader />
                </div >
            </div>
        )
    }

    if (error || !weatherData) {
        return (
            <div>Error loading data!</div>
        )
    }

    function handleOnCardClick() {
        dispatch(bringToTop(city))

        if (city.id === firstCity?.id) {
            navigate(`/${weatherData?.location.name}`, { replace: true })
        } else {
            changePage(1)
        }
    }

    function handleFavoriteBtnClick(e: React.MouseEvent, city: ICity) {
        e.stopPropagation()
        dispatch(toggleFavorite(city))
    }

    return (
        <div className={classes.cityItemLayout}>
            <div onClick={() => { scrollHandler(); handleOnCardClick(); }} className={`${classes.cityItem} ${city.name === firstCity.name ? classes.first : ''}`}>
                <div className={classes.likeBtn}>
                    <LikeButton handleLikeClick={e => handleFavoriteBtnClick(e, city)} isLiked={Boolean(city.isFavorite)} />
                </div>
                <h3 className={classes.header}>{weatherData.location.name}</h3>
                <img className={classes.icon} src={weatherData.current.condition.icon} />
                <h4>{weatherData.current.condition.text}</h4>
                <h4>{weatherData.current.temp_c} &deg;C</h4>
                {city.name === firstCity.name &&
                    <div className={classes.firstCityAddInfo}>
                        <div className={classes.firstCityAddInfoItem}>Humidity:
                            <div>{weatherData.current.humidity}%</div>
                        </div>
                        <div className={classes.firstCityAddInfoItem}>Feels like:
                            <div>{weatherData.current.feelslike_c} &deg;C</div>
                        </div>
                        <div className={classes.firstCityAddInfoItem}>Wind direction:
                            <div>{weatherData.current.wind_dir}</div>
                        </div>
                        <div className={classes.firstCityAddInfoItem}>Wind speed:
                            <div>{weatherData.current.wind_kph} kph</div></div>
                    </div>
                }
            </div >
        </div>
    )
}

export default CityCard