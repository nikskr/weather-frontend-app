import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type ILocationCurrentWeather } from "../models/IWeather";
// import { fetchCurrentWeatherByLocation } from "../store/reducers/ActionCreators";

export const currentWeatherAPI = createApi({
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
        })
    })
})