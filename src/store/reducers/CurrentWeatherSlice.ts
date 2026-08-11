import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILocationCurrentWeather } from "../../models/IWeather";
import { fetchCurrentWeatherByLocation } from "./ActionCreators";

interface CurrentWeatherState {
    locs: ILocationCurrentWeather[],
    isLoading: boolean,
    error: string
}

const initialState: CurrentWeatherState = {
    locs: [],
    isLoading: false,
    error: ''
}

export const currentWeatherSlice = createSlice({
    name: 'current-weather',
    initialState,
    reducers: {
        currentWeatherFetching(state) {
            state.isLoading = true
        },
        currentWeatherFetchingSuccess(state, action: PayloadAction<ILocationCurrentWeather>) {
            state.isLoading = false
            state.error = ''
            const uniqueOldLocs = state.locs.filter(oldLoc => {
                return oldLoc.location.name === action.payload.location.name ? false : true
            })
            state.locs = [action.payload, ...uniqueOldLocs]
        },
        // currentWeatherFetchingSuccess(state, action: PayloadAction<ILocationCurrentWeather[]>) {
        //     state.isLoading = false
        //     state.error = ''
        //     const uniqueOldLocs = state.locs.filter(oldLoc => {
        //         return action.payload.find(newLoc => oldLoc.location.name === newLoc.location.name) ? false : true
        //     })
        //     state.locs = [...action.payload, ...uniqueOldLocs]
        // },
        currentWeatherFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentWeatherByLocation.fulfilled.type, (state, action: PayloadAction<ILocationCurrentWeather>) => {
            state.isLoading = false
            state.error = ''
            const uniqueOldLocs = state.locs.filter(oldLoc => {
                return oldLoc.location.name === action.payload.location.name ? false : true
            })
            state.locs = [action.payload, ...uniqueOldLocs]
        })
        builder.addCase(fetchCurrentWeatherByLocation.pending.type, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCurrentWeatherByLocation.rejected.type, (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default currentWeatherSlice.reducer