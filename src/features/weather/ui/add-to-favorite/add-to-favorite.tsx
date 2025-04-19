import { useFavoriteLocationsStore } from '@entities/geolocation'
import { useWeatherStore } from '@entities/weather'

export const AddToFavorite = () => {
  const favoriteLocations = useFavoriteLocationsStore(s => s.favoriteLocations)
  const addLocation = useFavoriteLocationsStore(s => s.addLocation)
  const removeLocation = useFavoriteLocationsStore(s => s.removeLocation)
  const weather = useWeatherStore(s => s.weather)

  const isFavoriteLocation = favoriteLocations.some(
    location => location.id === weather?.id
  )

  const onFavoriteClick = () => {
    if (isFavoriteLocation && weather) {
      removeLocation(weather.id)
    } else if (!isFavoriteLocation && weather) {
      addLocation(weather)
    }
  }

  return (
    <button
      type={'button'}
      className={`btn btn-${isFavoriteLocation ? 'warning' : 'outline-warning text-white'} shadow-sm`}
      onClick={onFavoriteClick}
    >
      {`⭐ ${isFavoriteLocation ? 'Remove from Favorites' : 'Add to Favorites'}`}
    </button>
  )
}
