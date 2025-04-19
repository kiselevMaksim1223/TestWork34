import { ForecastWeather } from '@shared/api'

type ForecastByDate = Record<string, ForecastWeather['list']>

/**
 * Groups forecast weather data by date.
 * @returns An object where the keys are dates and the values are arrays of forecast weather data for that date.
 */
export const groupForecastByDate = (list: ForecastWeather['list']) => {
  return list.reduce<ForecastByDate>((acc, item) => {
    const date = item.dt_txt.split(' ')[0]
    if (!acc[date]) acc[date] = []
    acc[date].push(item)
    return acc
  }, {})
}
