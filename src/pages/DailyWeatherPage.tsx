import { useParams } from "react-router"
import { weatherAPI } from "../service/WeatherService"
import DayForecastCard from "../components/DayForecastCard/DayForecastCard"

const DailyWeatherPage = () => {
    const { cityName } = useParams()
    const { data: dailyForecast, isLoading, error } = weatherAPI.useFetchForecastByLocationQuery(cityName as string)

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
            <h1 style={{margin: '10px 0px 30px', textAlign: 'center'}}>
                Daily forecast for {dailyForecast.location.name}, {dailyForecast.location.country}
            </h1>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {dailyForecast.forecast.forecastday.map(day =>
                    <DayForecastCard key={day.date} date={day} />
                )}
            </div>
        </div>
    )
}

export default DailyWeatherPage