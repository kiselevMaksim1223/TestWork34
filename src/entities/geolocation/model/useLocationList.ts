import { useEffect } from 'react'
import { useLocationStore } from './useLocationStore'

export const useLocationList = (city: string) => {
  const locationList = useLocationStore(s => s.locationList)
  const error = useLocationStore(s => s.error)
  const isLoading = useLocationStore(s => s.isLoading)
  const fetchLocationList = useLocationStore(s => s.fetchLocationList)

  useEffect(() => {
    if (city === null || city === undefined) return
    fetchLocationList(city)
  }, [city, fetchLocationList])

  return { locationList, error, isLoading }
}
