import { useParams } from "react-router"
import { weatherAPI } from "../../service/WeatherService"
import DayForecastCard from "../../components/DayForecastCard/DayForecastCard"
import Loader from "../../components/UI/Loader/Loader"
import classes from './DailyWeatherPage.module.css'
import SynchronizedLineChart from "../../components/charts/SynchronizedLineChart"

const DailyWeatherPage = () => {
    const { cityName } = useParams()
    const { data: dailyForecast, isLoading, error } = weatherAPI.useFetchForecastByLocationQuery(cityName as string)

    if (isLoading) {
        return (
            <div className={classes.loader}>
                <Loader />
            </div>
        )
    }

    if (error || !dailyForecast) {
        return (
            <h1>Forecast data loading Error</h1>
        )
    }
    return (
        <div>
            <h1 className={classes.header}>
                Daily forecast for {dailyForecast.location.name}, {dailyForecast.location.country}
            </h1>
            <div className={classes.listWrapper}>
                {dailyForecast.forecast.forecastday.map(day =>
                    <DayForecastCard key={day.date} date={day} />
                )}
            </div>
            <div>
                <h2 className={classes.sectionTitle}>
                    Weather monitoring
                </h2>
                <SynchronizedLineChart data={dailyForecast.forecast.forecastday} type='date'/>
            </div>
        </div>
    )
}

export default DailyWeatherPage