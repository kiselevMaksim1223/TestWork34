import { getLocationList, GeoLocation } from '@shared/api'
import { create } from 'zustand'

interface LocationStore {
  locationList: GeoLocation[] | null
  currentCity: GeoLocation | null
  error: string | null
  isLoading: boolean
  fetchLocationList: (city: string) => Promise<void>
  setCurrentCity: (city: GeoLocation) => void
}

export const useLocationStore = create<LocationStore>(set => ({
  locationList: null,
  currentCity: null,
  error: null,
  isLoading: false,
  setCurrentCity: (city: GeoLocation) => {
    set({ currentCity: city })
  },
  async fetchLocationList(city) {
    if (!city) {
      set({ locationList: null })
      return
    }
    set({ isLoading: true, error: null })
    try {
      const locationList = await getLocationList(city)
      set({
        locationList
      })
    } catch (e: unknown) {
      set({ error: (e as Error).message, locationList: null })
    } finally {
      set({ isLoading: false })
    }
  }
}))
