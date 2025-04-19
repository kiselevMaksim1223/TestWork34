import { cookies } from 'next/headers'

import { SearchLocation } from '@features/search-location'
import { getCurrentWeather } from '@shared/api'
import { LocationDetector } from '@widgets/geolocation'
import { WeatherPreview } from '@widgets/weather-preview'

export default async function Home() {
  const cookiesStore = await cookies()
  const lat = cookiesStore.get('user-latitude')?.value
  const lon = cookiesStore.get('user-longitude')?.value

  const data = await getCurrentWeather({ lat, lon })

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

      <WeatherPreview ssrWeather={data} />
      <LocationDetector />
    </div>
  )
}
