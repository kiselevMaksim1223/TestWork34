import { useEffect, useRef } from 'react'

import { useLocationStore } from '@entities/geolocation'
import { CurrentWeather, GeoCoordinates } from '@shared/api'

import { useWeatherStore } from './useWeatherStore'

export const useWeatherData = ({
  initialData
}: {
  initialData?: CurrentWeather
}) => {
  const savedInitialData = useRef(initialData)
  const isFirstClientLoad = useRef(true)
  const setWeather = useWeatherStore(s => s.setWeather)

  const { weather, fetchCityWeather } = useWeatherStore()
  const currentCity = useLocationStore(s => s.currentCity)
  const error = useWeatherStore(s => s.error)
  const isLoading = useWeatherStore(s => s.isLoading)

  const locationCoords: GeoCoordinates = {
    lat: currentCity?.lat
      ? String(currentCity.lat)
      : String(initialData?.coord?.lat || '0'),
    lon: currentCity?.lon
      ? String(currentCity.lon)
      : String(initialData?.coord?.lon || '0')
  }

  useEffect(() => {
    if (isFirstClientLoad.current && savedInitialData.current) {
      isFirstClientLoad.current = false
      setWeather(savedInitialData.current)
      return
    }

    fetchCityWeather(locationCoords)
  }, [currentCity?.lat, currentCity?.lon, initialData])

  if (savedInitialData.current && isFirstClientLoad.current) {
    const data = savedInitialData.current

    return { weather: data, error: null, isLoading: false }
  }

  return { weather, error, isLoading }
}
