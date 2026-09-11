import type { ICity } from "../models/ICommon"
import { StorageService } from "../service/StorageService"

export const handleLocalStorageFavorites = (city: ICity) => {
    const storageFavorites: string[] | undefined = StorageService.get('favorites')
    if (!city.isFavorite) {
        if (!storageFavorites) {
            return StorageService.set('favorites', [city.name])
        }

        if (!storageFavorites.find(name => name === city.name)) {
            storageFavorites.push(city.name)
            StorageService.set('favorites', storageFavorites)
        }
    } else {
        const filteredArr = storageFavorites?.filter(name => !(name === city.name))
        StorageService.set('favorites', filteredArr)
    }
}