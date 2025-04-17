import { AxiosError } from 'axios'
import { axiosInstanceWeather } from '../axiosInstance'
import { CurrentWeather } from '../types/weather'
import { GeoCoordinates } from '../types/geolocation'

export const getCurrentWeather = async ({ lat, lon }: GeoCoordinates) => {
  try {
    const res = await axiosInstanceWeather.get<CurrentWeather>('/weather', {
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
