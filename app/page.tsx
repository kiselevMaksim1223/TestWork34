import { SearchLocation } from '@features/search-location/ui/search-location'
import { WeatherPreview } from '@widgets/weather-preview/ui/weather-preview'

import styles from './page.module.css'

export default async function Home() {
  // const headersList = await headers()
  // const ip = headersList.get('x-user-ip') || 'Unknown'
  // const country = headersList.get('x-user-country') || 'Unknown'
  // const city = headersList.get('x-user-city') || 'Unknown'
  // const region = headersList.get('x-user-region') || 'Unknown'
  // const acceptLanguage = headersList.get('accept-language') || 'en-US,en;q=0.9'

  return (
    <div className={styles.page}>
      <h1>Weather App</h1>
      <p>Welcome to the Weather App!</p>
      <p>
        This app provides weather information for various locations around the
        world.
      </p>
      <p>
        You can search for a location and get the current weather conditions,
        forecasts, and more.
      </p>
      <p>Enjoy exploring the weather!</p>
      <SearchLocation />
      <WeatherPreview initialCoords={{ lat: 0, lon: 0 }} />
    </div>
  )
}
