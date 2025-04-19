export type GeoLocation = {
  name: string
  lat: number
  lon: number
  country: string
  state: string
}

export type GeoCoordinates = {
  [key in keyof Pick<GeoLocation, 'lat' | 'lon'>]: string
}
