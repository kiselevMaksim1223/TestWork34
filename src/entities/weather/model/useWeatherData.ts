import { useEffect } from 'react'

import { useLocationStore } from '@entities/geolocation'
import { CurrentWeather, GeoCoordinates } from '@shared/api'

import { useWeatherStore } from './useWeatherStore'

export const useWeatherData = ({
  initialCoords
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

  const error = useWeatherStore(s => s.error)
  const isLoading = useWeatherStore(s => s.isLoading)

  useEffect(() => {
    fetchCityWeather(locationCoords)
  }, [initialCoords, currentCity])

  return { weather, error, isLoading }
}
