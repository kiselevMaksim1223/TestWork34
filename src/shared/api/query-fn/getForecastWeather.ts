import { AxiosError } from 'axios'

import { axiosInstanceWeather } from '../axiosInstance'
import { GeoCoordinates } from '../types/geolocation'
import { ForecastWeather } from '../types/weather'

export const getForecastWeather = async ({ lat, lon }: GeoCoordinates) => {
  try {
    const res = await axiosInstanceWeather.get<ForecastWeather>('/forecast', {
      params: { lat, lon }
    })
    return res.data
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data?.message || 'Error fetching weather')
    }
    throw new Error('Error fetching weather')
  }
}
