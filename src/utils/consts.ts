export const DAY_FORECAST_ROUTE = '/:cityName'
export const HOUR_FORECAST_ROUTE = '/:cityName/:date'
export const ABOUT_ROUTE = '/about'
export const FAVORITES_ROUTE = '/favorites'
export const DEFAULT_CITIES: string[] = import.meta.env.VITE_DEFAULT_CITIES ? import.meta.env.VITE_DEFAULT_CITIES.split(',') : []