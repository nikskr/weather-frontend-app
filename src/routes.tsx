import MainPage from "./pages/MainPage"
import AboutPage from "./pages/AboutPage"
import DailyWeatherPage from "./pages/DailyWeatherPage"
import HourlyWeatherPage from "./pages/HourlyWeatherPage"
import { ABOUT_ROUTE, DAY_FORECAST_ROUTE, FAVORITES_ROUTE, HOUR_FORECAST_ROUTE } from "./utils/consts"
import FavoritesPage from "./pages/FavoritesPage"

export const routes = [
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: FAVORITES_ROUTE,
        element: <FavoritesPage />
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