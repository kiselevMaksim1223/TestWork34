export const getWeatherClass = (main: string): string => {
  switch (main.toLowerCase()) {
    case 'clear':
      return 'clear'
    case 'clouds':
      return 'cloudy'
    case 'rain':
    case 'drizzle':
      return 'rainy'
    case 'thunderstorm':
      return 'stormy'
    case 'snow':
      return 'snowy'
    case 'mist':
    case 'haze':
    case 'fog':
      return 'foggy'
    default:
      return 'default'
  }
}
