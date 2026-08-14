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
                <img src={date.day.condition.icon}></img>
                <div>{date.day.condition.text}</div>
                <h3>{date.day.mintemp_c} &deg;C - {date.day.maxtemp_c} &deg;C</h3>
                <h4>{date.day.maxwind_kph} kph</h4>
            </div>
    )
}

export default DayForecastCard