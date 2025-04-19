import { AxiosError } from 'axios'

import { axiosInstanceWeather } from '../axiosInstance'
import { GeoCoordinates } from '../types/geolocation'
import { CurrentWeather } from '../types/weather'

export const getCurrentWeather = async ({
  lat,
  lon
}: Partial<GeoCoordinates>) => {
  if (!lat || !lon) return
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
