import { Fragment } from 'react'

import { useWeatherStore } from '@entities/weather'
import { CurrentWeather } from '@shared/api'

type Props = {
  ssrWeather?: CurrentWeather
}

export const FullWeatherInfo = ({ ssrWeather }: Props) => {
  const weather = useWeatherStore(s => s.weather)

  const { name, main, wind } = weather || ssrWeather || {}
  return (
    <Fragment>
      <h3 className={'text-primary fw-bold mb-2'}>{name}</h3>
      <div className={'fs-5 mb-3'}>
        <strong>🌡 Temperature:</strong> {main?.temp}°C <br />
        <small className={'text-muted'}>
          Feels like: {main?.feels_like}°C • Min: {main?.temp_min}°C • Max:{' '}
          {main?.temp_max}°C
        </small>
      </div>

      <div
        className={'d-flex flex-wrap gap-3 fs-6 justify-content-center mb-4'}
      >
        <div>
          <strong>💧 Humidity:</strong> {main?.humidity}%
        </div>
        <div>
          <strong>🔽 Pressure:</strong> {main?.pressure} hPa
        </div>
        <div>
          <strong>🌬 Wind:</strong> {wind?.speed} m/s
          {wind?.gust && <i> (Gust: {wind?.gust} m/s)</i>}
        </div>
      </div>
    </Fragment>
  )
}
