import DayForecastCard from "../../../components/DayForecastCard/DayForecastCard"
import classes from './DailyWeatherPage.module.css'
import SynchronizedLineChart from "../../../components/charts/SynchronizedLineChart"
import type { ICityForecast } from "../../../models/IWeather"
import { useOutletContext } from "react-router"

const DailyWeatherPage = () => {
    const dailyForecast = useOutletContext<ICityForecast>();
    console.log(123)
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
                <SynchronizedLineChart data={dailyForecast.forecast.forecastday} type='date' />
            </div>
        </div>
    )
}

export default DailyWeatherPage