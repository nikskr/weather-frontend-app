import { useParams } from "react-router"
import { weatherAPI } from "../service/WeatherService"
import DayForecastCard from "../components/DayForecastCard/DayForecastCard"
import Loader from "../components/UI/Loader/Loader"

const DailyWeatherPage = () => {
    const { cityName } = useParams()
    const { data: dailyForecast, isLoading, error } = weatherAPI.useFetchForecastByLocationQuery(cityName as string)

    if (isLoading) {
        return (
            <div style={{minHeight: 'calc(100vh - 62px)', display: "flex", justifyContent: "center", alignContent: "center"}}>
                <Loader />
            </div>
        )
    }

    if (error || !dailyForecast) {
        return (
            <h1>Forecast data loading Error</h1>
        )
    }
    return (
        <div>
            <h1 style={{padding: '20px 30px', textAlign: 'center'}}>
                Daily forecast for {dailyForecast.location.name}, {dailyForecast.location.country}
            </h1>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-around', padding: '0px 20px' }}>
                {dailyForecast.forecast.forecastday.map(day =>
                    <DayForecastCard key={day.date} date={day} />
                )}
            </div>
        </div>
    )
}

export default DailyWeatherPage