'use client'

import { useState } from 'react'
import { useLocationList, useLocationStore } from '@entities/geolocation'
import { useDebounce } from '@shared/hooks'
import { GeoLocation } from '@shared/api'

export const SearchLocation = () => {
  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input, 500)
  const { locationList, isLoading, error } = useLocationList(debouncedInput)
  const setCurrentCity = useLocationStore(s => s.setCurrentCity)

  const onSelectLocation = (location: GeoLocation) => {
    setCurrentCity(location)
    setInput('')
  }

  return (
    <div className={'position-relative w-100'} style={{ maxWidth: 400 }}>
      <input
        type='text'
        className='form-control'
        placeholder='Enter city name'
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      {isLoading && (
        <div className='position-absolute top-100 start-0 w-100 bg-white border p-2 text-center z-3'>
          <div className='spinner-border text-primary' />
        </div>
      )}

      {error && (
        <div className='position-absolute top-100 start-0 w-100 bg-white border p-2 text-danger z-3'>
          {error}
        </div>
      )}

      {input && locationList && locationList.length > 0 && !isLoading && (
        <ul className='list-group position-absolute top-100 start-0 w-100 z-3'>
          {locationList?.map((location, idx) => (
            <li
              key={idx}
              className='list-group-item list-group-item-action'
              onClick={() => onSelectLocation(location)}
              style={{ cursor: 'pointer' }}
            >
              {location.name}, {location.state ? `${location.state}, ` : ''}
              {location.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
