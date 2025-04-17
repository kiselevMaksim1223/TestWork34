'use client'

import { useWeatherData } from '@entities/weather/model/useWeatherData'
import { CurrentWeather, GeoCoordinates } from '@shared/api'

type Props = {
  initialCoords: GeoCoordinates
  ssrWeather?: CurrentWeather
}

export const WeatherPreview = ({ initialCoords, ssrWeather }: Props) => {
  const { weather, error, isLoading } = useWeatherData({ initialCoords })

  if (isLoading) return <div className='mt-4'>Loading weather...</div>
  if (error) return <div className='text-danger mt-4'>{error}</div>
  if (!weather) return null

  const { name, main, weather: w } = weather

  return (
    <div className='card mt-4 shadow-sm'>
      <div className='card-body d-flex flex-column flex-md-row align-items-center justify-content-between'>
        <div>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text mb-1'>{w[0].description}</p>
          <p className='card-text'>
            🌡 Temp: {main.temp}°C, Feels like: {main.feels_like}°C
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${w[0].icon}@2x.png`}
          alt='weather icon'
          className='ms-md-4'
        />
      </div>
    </div>
  )
}
