import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentWeatherReducer from './reducers/CurrentWeatherSlice'

const rootReducer = combineReducers({
    currentWeatherReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
