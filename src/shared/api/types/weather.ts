export type Weather = {
  description: string
  icon: string
}

export type WeatherMain = {
  temp: number
  feels_like: number
  humidity: number
  pressure: number
}

export type CurrentWeather = {
  name: string
  main: WeatherMain
  weather: Weather[]
}

export type ForecastWeatherList = {
  dt: number
  main: WeatherMain
  weather: Weather[]
}

export interface ForecastWeather {
  list: ForecastWeatherList[]
  city: { name: string }
}
