export interface ILocation {
    name: string,
    country: string
}

export interface ICondition {
    text: string,
    icon: string,
    code: number
}

export interface ICurrentWeather {
    temp_c: number,
    is_day: number,
    condition: ICondition,
    wind_kph: number,
    wind_dir: string,
    humidity: number,
    feels_like_c: number
}

export interface ILocationCurrentWeather {
    location: ILocation,
    current: ICurrentWeather
}

