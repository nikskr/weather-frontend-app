import { Outlet, useParams } from "react-router"
import { weatherAPI } from "../../service/WeatherService"
import DataWrapper from "../../components/UI/DataWrapper/DataWrapper"

const SharedForecastContainer = () => {
    const { cityName } = useParams<{ cityName: string }>()

    const { data: dailyForecast, isLoading, error } = weatherAPI.useFetchForecastByLocationQuery(cityName ?? '', { skip: !cityName })

    return (
        <DataWrapper isLoading={isLoading} data={dailyForecast} error={error}>
            <Outlet context={dailyForecast} />
        </DataWrapper>
    )
}

export default SharedForecastContainer
