import { groupForecastByDate } from '@entities/weather/helpers/groupForecastByDate'
import { ForecastCard } from '@entities/weather/ui/forecast-card/forecast-card'
import { GeoCoordinates, getForecastWeather } from '@shared/api'
import { BackButton } from '@shared/ui'

type Props = {
  searchParams: Promise<GeoCoordinates>
}

export async function generateMetadata({ searchParams }: Props) {
  const searchParamsAwaited = await searchParams
  const forecast = await getForecastWeather(searchParamsAwaited)
  const { city } = forecast
  return {
    title: `Forecast for ${city.name}`,
    description: `Weather forecast for ${city.name}`
  }
}

export default async function Page({ searchParams }: Props) {
  const searchParamsAwaited = await searchParams
  const forecast = await getForecastWeather(searchParamsAwaited)
  const { list, city } = forecast
  const groupedList = groupForecastByDate(list)

  return (
    <div className={'py-4'}>
      <BackButton />
      <h2 className={'mb-4 text-center align-self-center'}>
        Forecast for {city.name}
      </h2>
      <div className={'row row-cols-1 row-cols-md-3 g-4'}>
        {Object.entries(groupedList).map(([date, items]) => (
          <div className={'col'} key={date}>
            <ForecastCard date={date} items={items} />
          </div>
        ))}
      </div>
    </div>
  )
}
