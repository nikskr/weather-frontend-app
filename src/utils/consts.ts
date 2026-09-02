export const DAY_FORECAST_ROUTE = '/:cityName'
export const HOUR_FORECAST_ROUTE = '/:cityName/:date'
export const ABOUT_ROUTE = '/about'
export const FAVORITES_ROUTE = '/favorites'
export const DEFAULT_CITIES: string[] = import.meta.env.VITE_DEFAULT_CITIES ? import.meta.env.VITE_DEFAULT_CITIES.split(',') : []

interface IContactsLinks {
    name: string,
    link: string;
    icon: string;
}

export const CONTACTLINKS: IContactsLinks[] = [
    {
        name: 'GitHub',
        link: 'https://github.com/nikskr/weather-frontend-app',
        icon: '/icons/github.svg',
    },
    {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/nikita-skrabnevsky-970b16228',
        icon: '/icons/linkedin.svg',
    }
]