import type { IForecastHourWeather } from "../../models/IWeather"
import classes from './HourForecastCard.module.css'

interface HourForecastCardProps {
    hour: IForecastHourWeather,
    onClick: ( time: string) => void,
    active?: boolean
}

const HourForecastCard = ({hour, onClick, active}: HourForecastCardProps) => {
    return (
            <div id={active ? classes.active : ''} className={classes.card} onClick={() => onClick(hour.time)}>
            {/* <div className={active ? `${classes.card} ${classes.active}` : classes.card} onClick={(e) => onClick(e, hour.time)}> */}
                <h1>{hour.time.split(' ')[1]}</h1>
                <img className={active ? classes.active : ''} src={hour.condition.icon} />
                <div className={active ? classes.active : ''}>{hour.condition.text}</div>
                <h3>{hour.temp_c} &deg;C</h3>
                <h4 className={active ? classes.active : ''}>{hour.wind_dir} - {hour.wind_kph} kph</h4>
                <h4 className={active ? classes.active : ''}>{hour.humidity} %</h4>
            </div>
    )
}

export default HourForecastCard