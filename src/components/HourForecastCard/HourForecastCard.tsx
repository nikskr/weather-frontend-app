import type { IForecastHourWeather } from "../../models/IWeather"
import classes from './HourForecastCard.module.css'

interface HourForecastCardProps {
    hour: IForecastHourWeather
}

const HourForecastCard = ({hour}: HourForecastCardProps) => {
    return (
            <div className={classes.card}>
                <h1>{hour.time.split(' ')[1]}</h1>
                <h3>Температура: {hour.temp_c}</h3>
                <h4>Cкорость ветра: {hour.wind_kph}</h4>
                <h4>Влажность: {hour.humidity}</h4>
            </div>
    )
}

export default HourForecastCard