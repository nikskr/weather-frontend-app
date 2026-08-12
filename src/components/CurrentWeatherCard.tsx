import type { FC } from "react"
import { currentWeatherAPI } from "../service/CurrentWeatherService"

interface CurrentWeatherCardProps {
    city: string
}

const CurrentWeatherCard: FC<CurrentWeatherCardProps> = ({ city }) => {
    console.log(city)
    const { data, isLoading, error } = currentWeatherAPI.useFetchCurrentWeatherByLocationQuery(city)


    if (isLoading) {
        return (
            <div className="currentWeather__card">
                <h1>Data is loading...</h1>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="currentWeather__card">
                <h1>Error loading data for {city}.</h1>
            </div>
        )
    }

    return (
        <div className="currentWeather__card">
            <h2>{data.location.name}</h2>
            <h3>{data.current.temp_c} градусов</h3>
            <button>Delete</button>
        </div>
    )
}

export default CurrentWeatherCard