/* eslint-disable no-console */
'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useWeatherStore } from '@entities/weather'

const COOKIE_NAME = {
  USER_LATITUDE: 'user-latitude',
  USER_LONGITUDE: 'user-longitude',
  USER_CITY: 'user-city',
  USER_COUNTRY: 'user-country',
  USER_LOCATION_CONFIRMED: 'user-location-confirmed'
}

export const LocationDetector = () => {
  const cookies = Cookies.get()
  const refresh = useRouter().refresh
  const setWeather = useWeatherStore(s => s.setWeather)

  const [location, setLocation] = useState<{
    city: string
    country: string
    latitude?: number
    longitude?: number
  } | null>(null)
  const [coords, setCoords] = useState<{
    latitude: string
    longitude: string
  } | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (cookies[COOKIE_NAME.USER_LOCATION_CONFIRMED]) return

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 300000
    }

    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser.')
      return
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      setCoords({
        latitude: latitude.toString(),
        longitude: longitude.toString()
      })
      fallbackToIPLocation()
    }

    const handleError = (error: GeolocationPositionError) => {
      console.warn('Error getting location:', error)
      fallbackToIPLocation()
    }

    // Fallback to IP location if geolocation fails
    const fallbackToIPLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        if (!response.ok) throw new Error('Failed to fetch IP location')
        const data = await response.json()

        setLocation({
          city: data.city,
          country: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude
        })
        setShowAlert(true)
      } catch (error) {
        console.error('Error getting IP location:', error)
      }
    }

    // try to get location from geolocation API
    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  const confirmLocation = () => {
    Cookies.set(
      COOKIE_NAME.USER_LATITUDE,
      coords ? coords.latitude : String(location?.latitude),
      {
        sameSite: 'strict'
      }
    )
    Cookies.set(
      COOKIE_NAME.USER_LONGITUDE,
      coords ? coords.longitude : String(location?.longitude),
      {
        sameSite: 'strict'
      }
    )

    if (location) {
      Cookies.set(COOKIE_NAME.USER_CITY, location.city, { sameSite: 'strict' })
      Cookies.set(COOKIE_NAME.USER_COUNTRY, location.country, {
        sameSite: 'strict'
      })
    }

    Cookies.set(COOKIE_NAME.USER_LOCATION_CONFIRMED, 'true', {
      sameSite: 'strict'
    })
    setShowAlert(false)
    refresh()
    setWeather(null)
  }

  const dismiss = () => setShowAlert(false)

  if (!showAlert || !location) return null

  return (
    <div
      className={'alert alert-info position-fixed top-0 start-0 m-3 shadow'}
      role={'alert'}
    >
      <div className={'d-flex justify-content-between align-items-center mb-2'}>
        <div>
          <strong>Is this your location?</strong> {location.city},{' '}
          {location.country}
        </div>
        <button className={'btn-close'} onClick={dismiss}></button>
      </div>
      <div className={'d-flex gap-2'}>
        <button className={'btn btn-primary btn-sm'} onClick={confirmLocation}>
          Yes
        </button>
        <button
          className={'btn btn-outline-secondary btn-sm'}
          onClick={dismiss}
        >
          No
        </button>
      </div>
    </div>
  )
}
