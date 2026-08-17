import type { IForecastHourWeather } from "../../models/IWeather"
import classes from './HourForecastCard.module.css'

interface HourForecastCardProps {
    hour: IForecastHourWeather
}

const HourForecastCard = ({hour}: HourForecastCardProps) => {
    return (
            <div className={classes.card}>
                <h1>{hour.time.split(' ')[1]}</h1>
                <img src={hour.condition.icon} />
                <div>{hour.condition.text}</div>
                <h3>{hour.temp_c} &deg;C</h3>
                <h4>{hour.wind_dir} - {hour.wind_kph} kph</h4>
                <h4>{hour.humidity} %</h4>
            </div>
    )
}

export default HourForecastCard