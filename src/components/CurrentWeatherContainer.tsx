import { DEFAULT_CITIES } from "../variables/consts"
import CurrentWeatherCard from "./CurrentWeatherCard"

const CurrentWeatherContainer = () => {
    return (
        <>
            <div className="current_weather__list">
                {DEFAULT_CITIES.map(loc =>
                    <CurrentWeatherCard key={loc} city={loc} />
                )}
            </div>
        </>
    )
}

export default CurrentWeatherContainer