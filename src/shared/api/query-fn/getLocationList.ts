import { AxiosError } from 'axios'
import { axiosInstanceGeo } from '../axiosInstance'
import { GeoLocation } from '../types/geolocation'

const LOCATIONS_LIMIT = 5

export const getLocationList = async (city: string) => {
  try {
    const res = await axiosInstanceGeo.get<GeoLocation[]>('/direct', {
      params: { q: city, limit: LOCATIONS_LIMIT }
    })
    return res.data
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data?.message || 'Error fetching weather')
    }
    throw new Error('Error fetching weather')
  }
}
