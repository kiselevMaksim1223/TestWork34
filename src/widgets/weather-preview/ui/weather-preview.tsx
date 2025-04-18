'use client'

import Link from 'next/link'

import { useWeatherData } from '@entities/weather'
import { CurrentWeather, GeoCoordinates } from '@shared/api'

import styles from './styles.module.scss'
import { getWeatherClass } from '../helpers/getWeatherCardBackground'
import { Skeleton } from './skeleton/skelton'

type Props = {
  initialCoords: GeoCoordinates
  ssrWeather?: CurrentWeather
}

export const WeatherPreview = ({ initialCoords }: Props) => {
  const { weather, error, isLoading } = useWeatherData({ initialCoords })

  if (isLoading || !weather) return <Skeleton />
  if (error) return <div className={'text-danger mt-4 fs-5'}>{error}</div>

  const { name, main, weather: w, wind } = weather
  const weatherInfo = w[0]
  const weatherClass = getWeatherClass(weatherInfo.main)

  return (
    <div
      className={`card mt-4 shadow-lg border-0 p-4 ${styles.cardSoft} ${styles[weatherClass]}`}
    >
      <div className={'row align-items-center g-4'}>
        <div className={'col-md-4 text-center'}>
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`}
            alt={'weather icon'}
            className={`img-fluid ${styles.weatherIcon}`}
          />
          <h5 className={'mt-3 text-capitalize text-secondary'}>
            {weatherInfo.description}
          </h5>
          <Link href={'/forecast'} passHref>
            <button type={'button'} className={'btn btn-outline-secondary'}>
              📅 See 7-Day Forecast
            </button>
          </Link>
        </div>

        <div className={'col-md-8'}>
          <h3 className={'text-primary fw-bold mb-2'}>{name}</h3>
          <div className={'fs-5 mb-3'}>
            <strong>🌡 Temperature:</strong> {main.temp}°C <br />
            <small className={'text-muted'}>
              Feels like: {main.feels_like}°C • Min: {main.temp_min}°C • Max:{' '}
              {main.temp_max}°C
            </small>
          </div>

          <div
            className={
              'd-flex flex-wrap gap-3 fs-6 justify-content-center mb-4'
            }
          >
            <div>
              <strong>💧 Humidity:</strong> {main.humidity}%
            </div>
            <div>
              <strong>🔽 Pressure:</strong> {main.pressure} hPa
            </div>
            <div>
              <strong>🌬 Wind:</strong> {wind.speed} m/s
              {wind.gust && <i> (Gust: {wind.gust} m/s)</i>}
            </div>
          </div>

          <div className={'d-flex flex-wrap gap-3 justify-content-end'}>
            <button type={'button'} className={'btn btn-outline-warning'}>
              ⭐ Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
