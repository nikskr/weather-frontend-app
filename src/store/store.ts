import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { weatherAPI } from "../service/WeatherService";
import citiesReducer from "./reducers/CitiesSlice";

const rootReducer = combineReducers({
    [weatherAPI.reducerPath]: weatherAPI.reducer,
    citiesReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(weatherAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
