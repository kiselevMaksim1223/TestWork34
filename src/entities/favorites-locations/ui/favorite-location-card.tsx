'use client'
import { CurrentWeather } from '@shared/api'

import { useFavoriteLocationsStore } from '../model/useFavoriteLocations'

interface FavoriteCardProps {
  location: CurrentWeather
}

export const FavoriteLocationCard = ({ location }: FavoriteCardProps) => {
  const onRemove = useFavoriteLocationsStore(s => s.removeLocation)
  return (
    <div
      className={
        'text-decoration-none text-dark col-12 col-sm-6 col-md-4 col-lg-3'
      }
    >
      <div className={'card shadow-sm h-100'}>
        <div className={'card-body'}>
          <div className={'d-flex justify-content-between align-items-center'}>
            <h5 className={'card-title'}>{location.name}</h5>
            <button
              className={'btn btn-outline-danger btn-sm'}
              onClick={e => {
                e.preventDefault()
                onRemove(location.id)
              }}
            >
              X
            </button>
          </div>
          <p className={'card-text'}>
            🌡️ {Math.round(location.main.temp)}°C <br />
            💧 Humanity: {location.main.humidity}% <br />
            💨 Wind: {location.wind.speed} м/с
          </p>
        </div>
      </div>
    </div>
  )
}
