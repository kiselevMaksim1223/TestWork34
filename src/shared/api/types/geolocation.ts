export type GeoLocation = {
  name: string
  lat: number
  lon: number
  country: string
  state: string
}

export type GeoCoordinates = Pick<GeoLocation, 'lat' | 'lon'>
