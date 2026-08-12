import { useNavigate } from "react-router"
import type { IForecastDateWeather } from "../models/IWeather"

interface DayForecastCardProps {
    date: IForecastDateWeather
}

const DayForecastCard = ({ date }: DayForecastCardProps) => {
    const navigate = useNavigate()

    return (
            <div onClick={() => navigate(date.date)} className="day-weather-card">
                <h1>{date.date}</h1>
                <h3>Температура: {date.day.mintemp_c} - {date.day.maxtemp_c}</h3>
                <h4>Макс. скорость ветра: {date.day.maxwind_kph}</h4>
            </div>
    )
}

export default DayForecastCard