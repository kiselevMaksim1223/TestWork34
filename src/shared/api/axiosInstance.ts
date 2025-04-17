import axios from 'axios'

export const axiosInstanceWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    units: 'metric',
    lang: 'en'
  }
})

export const axiosInstanceGeo = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0',
  params: {
    appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    units: 'metric',
    lang: 'en'
  }
})
