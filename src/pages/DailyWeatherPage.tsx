import { useParams } from "react-router"
import { currentWeatherAPI } from "../service/CurrentWeatherService"
import DayForecastCard from "../components/DayForecastCard"

const DailyWeatherPage = () => {
    const { cityName } = useParams()
    const { data: dailyForecast, isLoading, error } = currentWeatherAPI.useFetchForecastByLocationQuery(cityName as string)

    if (isLoading) {
        return (
            <h1>Forecast data is loading...</h1>
        )
    }

    if (error || !dailyForecast) {
        return (
            <h1>Forecast data loading Error</h1>
        )
    }
    return (
        <div>
            <h1>
                DAY
            </h1>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {dailyForecast.forecast.forecastday.map(day =>
                    <DayForecastCard key={day.date} date={day} />
                )}
            </div>
        </div>

    )
}

export default DailyWeatherPage