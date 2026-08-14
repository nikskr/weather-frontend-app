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
    feelslike_c: number
}

export interface ILocationCurrentWeather {
    location: ILocation,
    current: ICurrentWeather
}

export interface IForecastHourWeather {
    time: string,
    temp_c: number,
    condition: ICondition,
    wind_kph: number,
    humidity: number
}


export interface IForecastDayWeather {
    maxtemp_c: number,
    mintemp_c: number,
    avgtemp_c: number,
    maxwind_kph: number,
    avghumidity: number,
    condition: ICondition
}

export interface IForecastDateWeather {
    date: string,
    day: IForecastDayWeather,
    hour: IForecastHourWeather[]
}

export interface IForecastWeather {
    forecastday: IForecastDateWeather[]
}

export interface ICityForecast extends ILocationCurrentWeather{
    forecast: IForecastWeather
}
