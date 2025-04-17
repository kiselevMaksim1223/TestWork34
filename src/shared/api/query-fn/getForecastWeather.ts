import { AxiosError } from 'axios'
import { axiosInstanceWeather } from '../axiosInstance'
import { ForecastWeather } from '../types/weather'
import { GeoCoordinates } from '../types/geolocation'

const DAYS_COUNT = 7

export const getForecastWeather = async ({ lat, lon }: GeoCoordinates) => {
  try {
    const res = await axiosInstanceWeather.get<ForecastWeather>('/forecast', {
      params: { lat, lon, cnt: DAYS_COUNT }
    })
    return res.data
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data?.message || 'Error fetching weather')
    }
    throw new Error('Error fetching weather')
  }
}
