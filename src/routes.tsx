import MainPage from "./pages/MainPage"
import AboutPage from "./pages/AboutPage/AboutPage"
import DailyWeatherPage from "./pages/SharedForecastContainer/DailyWeatherPage/DailyWeatherPage"
import HourlyWeatherPage from "./pages/SharedForecastContainer/HourlyWeatherPage/HourlyWeatherPage"
import { ABOUT_ROUTE, FAVORITES_ROUTE, HOUR_FORECAST_ROUTE, SHARED_FORECAST_ROUTE } from "./utils/consts"
import FavoritesPage from "./pages/FavoritesPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import SharedForecastContainer from "./pages/SharedForecastContainer/SharedForecastContainer"

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
        path: ABOUT_ROUTE,
        element: <AboutPage />
    },
    {
        path: SHARED_FORECAST_ROUTE,
        element: <SharedForecastContainer />,
        children: [
            {
                // path: DAY_FORECAST_ROUTE,
                index: true,
                element: <DailyWeatherPage />,
            },
            {
                path: HOUR_FORECAST_ROUTE,
                element: <HourlyWeatherPage />
            },
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
]