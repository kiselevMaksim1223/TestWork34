import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CurrentWeather } from '@shared/api'

type FavoriteLocationsStore = {
  favoriteLocations: CurrentWeather[]
  addLocation: (location: CurrentWeather) => void
  removeLocation: (id: number) => void
}

export const useFavoriteLocationsStore = create<FavoriteLocationsStore>()(
  persist(
    (set, get) => ({
      favoriteLocations: [],
      addLocation: location =>
        set({ favoriteLocations: [...get().favoriteLocations, location] }),
      removeLocation: id =>
        set({
          favoriteLocations: get().favoriteLocations.filter(c => c.id !== id)
        })
    }),
    { name: 'favorite-locations-storage' }
  )
)
