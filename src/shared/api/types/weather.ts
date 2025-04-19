export type Weather = {
  main: string
  description: string
  icon: string
}

export type WeatherMain = {
  temp: number
  feels_like: number
  humidity: number
  pressure: number
  temp_min: number
  temp_max: number
}

export type CurrentWeather = {
  id: number
  name: string
  main: WeatherMain
  weather: Weather[]
  wind: { speed: number; gust: number }
  coord: { lon: number; lat: number }
}

export type ForecastWeatherList = {
  dt: number
  main: WeatherMain
  weather: Weather[]
  wind: { speed: number; gust: number }
  dt_txt: string
}

export interface ForecastWeather {
  list: ForecastWeatherList[]
  city: { name: string }
}
