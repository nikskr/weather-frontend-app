// import axios from "axios";
// import type { AppDispatch } from "../store";
// import { type ILocationCurrentWeather } from "../../models/IWeather";
// import { DEFAULT_CITIES } from "../../variables/consts";
// import { currentWeatherSlice } from "./CurrentWeatherSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import WeatherApi from "../../api/WeatherApi";
import axios from "axios";
import type { ILocationCurrentWeather } from "../../models/IWeather";

// export const fetchCurrentWeatherByLocation = (location: string) => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(currentWeatherSlice.actions.currentWeatherFetching())
//         const response = await axios.get<ILocationCurrentWeather>(`${import.meta.env.VITE_BASE_API_URL}/current.json`, {
//             params: {
//                 q: location,
//                 key: import.meta.env.VITE_WEATHER_API_KEY
//             }
//         })
//         dispatch(currentWeatherSlice.actions.currentWeatherFetchingSuccess([response.data]))
//         return response.data
//     } catch (e) {
//         const errorMessage = e instanceof Error ? e.message : 'Unknown error fetching weather info';
//         dispatch(currentWeatherSlice.actions.currentWeatherFetchingError(errorMessage));
//         return undefined
//     }
// }

export const fetchCurrentWeatherByLocation = createAsyncThunk(
    'current-weather/fetchByLocation',
    async (location: string, thunkAPI) => {
        try {
            // const response = await WeatherApi.getWeatherDataByLocation(location)
            const response = await axios.get<ILocationCurrentWeather>(`${import.meta.env.VITE_BASE_API_URL}/current.json`, {
            params: {
                q: location,
                key: import.meta.env.VITE_WEATHER_API_KEY
            }
        })
            return response.data
        } catch (e) {
            if (e instanceof Error) {
                console.log(e)
            }
            return thunkAPI.rejectWithValue('Cannot load weather data')
        }
    }
)

// export const fetchLocationsCurrentWeather = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(currentWeatherSlice.actions.currentWeatherFetching())

//         const promises = DEFAULT_CITIES.map(async (loc) => {
//             return await fetchCurrentWeather(dispatch, loc)
//         })

//         const results = await Promise.all(promises)

//         const locs: ILocationCurrentWeather[] = results.filter((data): data is ILocationCurrentWeather => data !== undefined)

//         if (locs.length > 0) {
//             dispatch(currentWeatherSlice.actions.currentWeatherFetchingSuccess(locs))
//         } else {
//             console.log("Current weather requests are failed")
//         }

//     } catch (e) {
//         if (e instanceof Error)
//             dispatch(currentWeatherSlice.actions.currentWeatherFetchingError(e.message))
//         else console.log('Unknow error loading weather data...')
//     }

// }

// export const fetchOneCurrentWeather = (location: string) => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(currentWeatherSlice.actions.currentWeatherFetching())
//         const response = await axios.get<ILocationCurrentWeather>(`${import.meta.env.VITE_BASE_API_URL}/current.json`, {
//             params: {
//                 q: location,
//                 key: import.meta.env.VITE_WEATHER_API_KEY
//             }
//         })
//         dispatch(currentWeatherSlice.actions.currentWeatherFetchingSuccess([response.data]))
//     } catch (e) {
//         if (e instanceof Error)
//             dispatch(currentWeatherSlice.actions.currentWeatherFetchingError(e.message))
//         else
//             console.log('Unknow error loading weather data...')
//     }
// }