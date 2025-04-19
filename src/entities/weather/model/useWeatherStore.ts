import { create } from 'zustand'

import { getCurrentWeather, CurrentWeather, GeoCoordinates } from '@shared/api'

interface WeatherStore {
  weather: CurrentWeather | null
  isLoading: boolean
  error: string | null
  setWeather: (weather: CurrentWeather | null) => void
  fetchCityWeather: (
    coord: GeoCoordinates,
    preloadedData?: CurrentWeather
  ) => Promise<void>
}

export const useWeatherStore = create<WeatherStore>(set => ({
  weather: null,
  isLoading: false,
  error: null,
  setWeather: weather => set({ weather }),
  async fetchCityWeather(coord, preloadedData?) {
    set({ isLoading: true, error: null })

    try {
      const weather = preloadedData ?? (await getCurrentWeather(coord))
      set({ weather })
    } catch (e: unknown) {
      set({ error: (e as Error).message })
    } finally {
      set({ isLoading: false })
    }
  }
}))
