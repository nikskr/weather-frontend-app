import MainPage from "./pages/MainPage"
import AboutPage from "./pages/AboutPage"
import DailyWeatherPage from "./pages/DailyWeatherPage"
import HourlyWeatherPage from "./pages/HourlyWeatherPage"
import { ABOUT_ROUTE, DAY_FORECAST_ROUTE, HOUR_FORECAST_ROUTE } from "./utils/consts"

export const routes = [
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: DAY_FORECAST_ROUTE,
        element: <DailyWeatherPage />
    },
    {
        path: HOUR_FORECAST_ROUTE,
        element: <HourlyWeatherPage />
    },
    {
        path: ABOUT_ROUTE,
        element: <AboutPage />
    }
]