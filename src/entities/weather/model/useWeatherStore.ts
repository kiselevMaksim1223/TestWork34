import { getCurrentWeather, CurrentWeather, GeoCoordinates } from '@shared/api'
import { create } from 'zustand'

interface WeatherStore {
  weather: CurrentWeather | null
  isLoading: boolean
  error: string | null
  fetchCityWeather: (
    coord: GeoCoordinates,
    preloadedData?: CurrentWeather
  ) => Promise<void>
}

export const useWeatherStore = create<WeatherStore>(set => ({
  weather: null,
  isLoading: false,
  error: null,
  async fetchCityWeather(coord, preloadedData?) {
    set({ isLoading: true, error: null })

    try {
      const weather = preloadedData ?? (await getCurrentWeather(coord))
      set({ weather })
    } catch (e: any) {
      set({ error: e.message })
    } finally {
      set({ isLoading: false })
    }
  }
}))
