import { useNavigate } from "react-router"
import type { IForecastDateWeather } from "../../models/IWeather"
import classes from './DayForecastCard.module.css'

interface DayForecastCardProps {
    date: IForecastDateWeather
}

const DayForecastCard = ({ date }: DayForecastCardProps) => {
    const navigate = useNavigate()

    const [, month, day] = date.date.split('-')
    const dayMonthDate = `${day}.${month}`


    return (
            <div onClick={() => navigate(date.date)} className={classes.card}>
                <h1>{dayMonthDate}</h1>
                <h3>Температура: {date.day.mintemp_c} - {date.day.maxtemp_c}</h3>
                <h4>Макс. скорость ветра: {date.day.maxwind_kph}</h4>
            </div>
    )
}

export default DayForecastCard