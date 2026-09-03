import { useParams } from "react-router"
import { weatherAPI } from "../../service/WeatherService"
import HourForecastCard from "../../components/HourForecastCard/HourForecastCard"
import Loader from "../../components/UI/Loader/Loader"
import classes from './HourlyWeatherPage.module.css'
import SynchronizedLineChart from "../../components/charts/SynchronizedLineChart"
import { useState } from "react"
import type { IForecastHourWeather } from "../../models/IWeather"

const HourlyWeatherPage = () => {
    const { cityName, date } = useParams()
    const { data: dailyForecast, isLoading, error } = weatherAPI.useFetchForecastByLocationQuery(cityName as string)

    const [activeCard, setActiveCard] = useState<IForecastHourWeather | null>(null)

    if (isLoading) {
        return (
            <div className={classes.loader}>
                <Loader />
            </div>
        )
    }

    if (error || !dailyForecast) {
        return (
            <h1>Hour forecast data loading Error</h1>
        )
    }

    if (!date) {
        return (
            <h1 className={classes.dateError}>
                Date is not correct
            </h1>
        )
    }

    const [day] = dailyForecast.forecast.forecastday.filter(day => day.date === date)
    const [year, month, dayOfMonth] = date.split('-')

    function handleCardClick( time: string | null) {
        if (activeCard) {
            setActiveCard(null);
            return;
        }

        const card = day.hour.find((h) => h.time === time);

        if (card !== undefined) {
            setActiveCard(card)
        }
    }

    return (
        <div>
            <h1 className={classes.header}>
                {`Hourly forecast for ${dailyForecast.location.name}, ${dailyForecast.location.country} for ${dayOfMonth}.${month}.${year}`}
            </h1>
            <div className={classes.listWrapper}>
                {day.hour.map(hour =>
                    <HourForecastCard key={hour.time} hour={hour} onClick={handleCardClick} />
                )}
            </div>
            {activeCard &&
                <div className={classes.activeCardWrapper} onClick={() => handleCardClick(null)}>
                    <HourForecastCard hour={activeCard} active={true} onClick={handleCardClick} />
                </div>
            }
            <div>
                <h2 className={classes.sectionTitle}>
                    Weather monitoring
                </h2>
                <SynchronizedLineChart data={day.hour} type='hour' />
            </div>
        </div>
    )
}

export default HourlyWeatherPage