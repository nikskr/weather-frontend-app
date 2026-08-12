import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICity } from "../../models/ICommon";
import { DEFAULT_CITIES } from "../../variables/consts";

interface CitiesState {
    cities: ICity[]
}

const initialState: CitiesState = {
    cities: DEFAULT_CITIES.map((city, i) => ({
        id: i,
        name: city,
        isFavorite: false
    }))
}

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        bringToTop(state, action: PayloadAction<ICity>) {
            const targetIndex = state.cities.findIndex(c => c.id === action.payload.id)
            if (targetIndex !== -1) {
                const [targetCity] = state.cities.splice(targetIndex, 1)
                state.cities.unshift(targetCity)
            } else {
                state.cities = [{id: Date.now(), name: action.payload.name, isFavorite: false}, ...state.cities]
            }
        },
        toggleFavorite(state, action: PayloadAction<ICity>) {
            const targetIndex = state.cities.findIndex(c => c.id === action.payload.id)
            state.cities[targetIndex].isFavorite = !state.cities[targetIndex].isFavorite
        }
    }
})

export default citiesSlice.reducer