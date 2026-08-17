import { useParams } from "react-router"
import { weatherAPI } from "../service/WeatherService"
import HourForecastCard from "../components/HourForecastCard/HourForecastCard"
import Loader from "../components/UI/Loader/Loader"

const HourlyWeatherPage = () => {
    const { cityName, date } = useParams()
    const { data: dailyForecast, isLoading, error } = weatherAPI.useFetchForecastByLocationQuery(cityName as string)

    if (isLoading) {
        return (
            <div style={{ minHeight: 'calc(100vh - 105px)', display: "flex", justifyContent: "center", alignContent: "center" }}>
                <Loader />
            </div>
        )
    }

    if (error || !dailyForecast) {
        return (
            <h1>Hour forecast data loading Error</h1>
        )
    }

    if (!date) {
        return (
            <h1 style={{ margin: '10px 0px 30px', textAlign: 'center' }}>
                Date is not correct
            </h1>
        )
    }
    const [day] = dailyForecast.forecast.forecastday.filter(day => day.date === date)
    const [year, month, dayOfMonth] = date.split('-')

    return (
        <div>
            <h1 style={{ padding: '20px 30px', textAlign: 'center' }}>
                {`Hourly forecast for ${dailyForecast.location.name}, ${dailyForecast.location.country} for ${dayOfMonth}.${month}.${year}`}
            </h1>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-around', padding: '0px 20px', marginBottom: '50px' }}>
                {day.hour.map(hour =>
                    <HourForecastCard key={hour.time} hour={hour} />
                )}
            </div>
        </div>
    )
}

export default HourlyWeatherPage