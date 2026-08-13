import { useParams } from "react-router"
import { weatherAPI } from "../service/WeatherService"
import HourForecastCard from "../components/HourForecastCard/HourForecastCard"

const HourlyWeatherPage = () => {
    const { cityName, date } = useParams()
    const { data: dailyForecast, isLoading, error } = weatherAPI.useFetchForecastByLocationQuery(cityName as string)
    
    if (isLoading) {
        return (
            <h1>Hour forecast data is loading...</h1>
        )
    }

    if (error || !dailyForecast) {
        return (
            <h1>Hour forecast data loading Error</h1>
        )
    }

    if (!date) {
        return (
            <h1 style={{margin: '10px 0px 30px', textAlign: 'center'}}>
                Date is not correct
            </h1>
        )
    }
    const [day] = dailyForecast.forecast.forecastday.filter(day => day.date === date)
    const [year, month, dayOfMonth] = date.split('-')

    return (
        <div>
            <h1 style={{margin: '10px 0px 30px', textAlign: 'center'}}>
                {`Hourly forecast for ${dailyForecast.location.name}, ${dailyForecast.location.country} for ${dayOfMonth}.${month}.${year}`}
            </h1>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {day.hour.map(hour =>
                    <HourForecastCard key={hour.time} hour={hour} />
                )}
            </div>
        </div>
    )
}

export default HourlyWeatherPage