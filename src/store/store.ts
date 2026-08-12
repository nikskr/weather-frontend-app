import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import currentWeatherReducer from './reducers/CurrentWeatherSlice'
import { currentWeatherAPI } from "../service/CurrentWeatherService";

const rootReducer = combineReducers({
    // currentWeatherReducer
    [currentWeatherAPI.reducerPath]: currentWeatherAPI.reducer 
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(currentWeatherAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
