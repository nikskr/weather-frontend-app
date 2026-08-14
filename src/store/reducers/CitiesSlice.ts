import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICity } from "../../models/ICommon";
import { DEFAULT_CITIES } from "../../utils/consts";
import { StorageService } from "../../service/StorageService";

interface CitiesState {
    cities: ICity[]
}

const initialCityArr = () => {
    const favorites: string[] | undefined = StorageService.get('favorites')

    if (favorites && favorites.length > 0) {
        const uniqueCities = favorites.filter(c => !DEFAULT_CITIES.includes(c))

        const resultArr = [...DEFAULT_CITIES.map(city => {
            if (favorites.includes(city)) {
                return {
                    name: city,
                    isFavorite: true
                }
            }
            return {
                name: city,
                isFavorite: false
            }
        }),
        ...uniqueCities.map(city => ({
            name: city,
            isFavorite: true
        }))]

        return resultArr.map((city, i) => ({
            id: i,
            name: city.name,
            isFavorite: city.isFavorite
        }))
    }

    return DEFAULT_CITIES.map((city, i) => ({
        id: i,
        name: city,
        isFavorite: false
    }))
}

const initialState: CitiesState = {
    cities: initialCityArr()
}

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        bringToTop(state, action: PayloadAction<ICity>) {
            const targetIndex = state.cities.findIndex(c => c.name === action.payload.name)
            if (targetIndex !== -1) {
                const [targetCity] = state.cities.splice(targetIndex, 1)
                state.cities.unshift(targetCity)
            } else {
                state.cities = [{ id: Date.now(), name: action.payload.name, isFavorite: false }, ...state.cities]
            }
        },
        toggleFavorite(state, action: PayloadAction<ICity>) {
            const targetIndex = state.cities.findIndex(c => c.id === action.payload.id)
            state.cities[targetIndex].isFavorite = !state.cities[targetIndex].isFavorite

            const storageFavorites: string[] | undefined = StorageService.get('favorites')

            if (state.cities[targetIndex].isFavorite) {
                if (!storageFavorites) {
                    return StorageService.set('favorites', [state.cities[targetIndex].name])
                }

                if (!storageFavorites.find(name => name === state.cities[targetIndex].name)) {
                    storageFavorites.push(state.cities[targetIndex].name)
                    StorageService.set('favorites', storageFavorites)
                }
            } else {
                const filteredArr = storageFavorites?.filter(name => !(name === state.cities[targetIndex].name))
                StorageService.set('favorites', filteredArr)
            }
        }
    }
})

export default citiesSlice.reducer