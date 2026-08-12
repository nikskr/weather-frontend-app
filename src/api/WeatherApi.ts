// import axios, { type AxiosResponse } from "axios"
// import type { ILocationCurrentWeather } from "../models/IWeather"

// export default class WeatherApi {
//     static getWeatherDataByLocation = async (location: string): Promise<AxiosResponse<ILocationCurrentWeather>> => {
//         return (await axios.get<ILocationCurrentWeather>(`${import.meta.env.VITE_BASE_API_URL}/current.json`, {
//             params: {
//                 q: location,
//                 key: import.meta.env.VITE_WEATHER_API_KEY
//             }
//         }))
//     } 
// }