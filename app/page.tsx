import { WeatherPreview } from '@widgets/weather-preview'

import { SearchLocation } from '@features/search-location'

export default async function Home() {
  //TODO: add server-side rendering to get the user's location
  return (
    <div className={`text-center py-5`}>
      <h1 className={`display-4 fw-bold mb-4 text-primary`}>Weather App</h1>
      <p className={'lead mb-3 text-muted'}>
        Welcome to your personal weather assistant!
      </p>
      <p className={'mb-2 text-muted'}>
        Get real-time weather updates for cities across the globe.
      </p>
      <p className={'mb-4 text-muted'}>
        Enter a location below to begin exploring.
      </p>

      <div className={'mb-5'}>
        <SearchLocation />
      </div>

      <WeatherPreview initialCoords={{ lat: 0, lon: 0 }} />
    </div>
  )
}
