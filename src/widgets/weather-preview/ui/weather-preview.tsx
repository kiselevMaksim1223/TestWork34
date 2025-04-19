'use client'

import Link from 'next/link'

import { FullWeatherInfo, useWeatherData, WeatherIcon } from '@entities/weather'
import { AddToFavorite } from '@features/weather'
import { CurrentWeather } from '@shared/api'

import styles from './styles.module.scss'
import { getWeatherClass } from '../helpers/getWeatherCardBackground'
import { Skeleton } from './skeleton/skelton'

type Props = {
  ssrWeather?: CurrentWeather
}

export const WeatherPreview = ({ ssrWeather }: Props) => {
  const { weather, error, isLoading } = useWeatherData({
    initialData: ssrWeather
  })

  if (isLoading || !weather) return <Skeleton />
  if (error) return <div className={'text-danger mt-4 fs-5'}>{error}</div>

  const { weather: w } = weather

  const weatherInfo = w[0]

  const weatherClass = getWeatherClass(weatherInfo.main)

  return (
    <div
      className={`card mt-4 shadow-lg border-0 p-4 ${styles.cardSoft} ${styles[weatherClass]}`}
    >
      <div className={'row align-items-center g-4'}>
        <div className={'col-md-4 text-center'}>
          <WeatherIcon weatherInfo={weatherInfo} />
          <div className={'d-flex flex-column align-items-center gap-2'}>
            <Link
              href={{
                pathname: '/forecast',
                query: { lat: weather.coord.lat, lon: weather.coord.lon }
              }}
            >
              <button type={'button'} className={'btn btn-outline-secondary'}>
                📅 See 6-Day Forecast
              </button>
            </Link>
            <Link
              href={{
                pathname: '/favorites'
              }}
            >
              <button type={'button'} className={'btn btn-outline-secondary'}>
                🌟 See Favorite Locations
              </button>
            </Link>
          </div>
        </div>

        <div className={'col-md-8'}>
          <FullWeatherInfo ssrWeather={ssrWeather} />
          <div className={'d-flex flex-wrap gap-3 justify-content-end'}>
            <AddToFavorite />
          </div>
        </div>
      </div>
    </div>
  )
}
