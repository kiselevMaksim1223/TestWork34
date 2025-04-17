import { useEffect } from 'react'
import { useWeatherStore } from './useWeatherStore'
import { CurrentWeather, GeoCoordinates } from '@shared/api'
import { useLocationStore } from '@entities/geolocation'

export const useWeatherData = ({
  initialCoords,
  ssrWeather
}: {
  initialCoords: GeoCoordinates
  ssrWeather?: CurrentWeather
}) => {
  const { weather, fetchCityWeather } = useWeatherStore()
  const currentCity = useLocationStore(s => s.currentCity)
  const locationCoords: GeoCoordinates = {
    lat: currentCity?.lat ?? initialCoords.lat,
    lon: currentCity?.lon ?? initialCoords.lon
  }
  console.log('locationCoords', locationCoords)

  const error = useWeatherStore(s => s.error)
  const isLoading = useWeatherStore(s => s.isLoading)

  useEffect(() => {
    fetchCityWeather(locationCoords)
  }, [initialCoords, currentCity])

  return { weather, error, isLoading }
}
