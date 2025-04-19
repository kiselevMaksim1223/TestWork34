'use client'

import {
  FavoriteLocationCard,
  useFavoriteLocationsStore
} from '@entities/favorites-locations'
import { BackButton } from '@shared/ui'

export const FavoritesLocations = () => {
  const favoriteLocations = useFavoriteLocationsStore(s => s.favoriteLocations)

  return (
    <div className={'container my-4'}>
      <h1 className={'mb-4'}>🌟 Favorites locations</h1>
      <BackButton />
      {favoriteLocations.length === 0 ? (
        <p>You have no favorite locations yet.</p>
      ) : (
        <div className={'row gy-4'}>
          {favoriteLocations.map(location => (
            <FavoriteLocationCard key={location.id} location={location} />
          ))}
        </div>
      )}
    </div>
  )
}
