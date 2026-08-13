import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type ICityForecast, type ILocationCurrentWeather } from "../models/IWeather";

export const weatherAPI = createApi({
    reducerPath: 'currentWeatherAPI',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),
    endpoints: (builder) => ({
        fetchCurrentWeatherByLocation: builder.query<ILocationCurrentWeather, string>({
            query: (location) => ({
                url: '/current.json',
                params: {
                    q: location,
                    key: import.meta.env.VITE_WEATHER_API_KEY
                }
            })
        }),
        fetchForecastByLocation: builder.query<ICityForecast, string>({
            query: (location) => ({
                url: '/forecast.json',
                params: {
                    q: location,
                    key: import.meta.env.VITE_WEATHER_API_KEY,
                    days: 14
                }
            })
        })

    })
})