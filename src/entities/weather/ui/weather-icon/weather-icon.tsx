import { Fragment } from 'react'

import { Weather } from '@shared/api'

type Props = {
  weatherInfo: Weather
  size?: number | string
}

export const WeatherIcon = ({ weatherInfo, size = 80 }: Props) => {
  return (
    <Fragment>
      <img
        src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`}
        alt={'weather icon'}
        width={size}
        height={size}
        className={`img-fluid object-fit-contain rounded-2 p-1 bg-light shadow-sm`}
      />
      <h5 className={'mt-3 text-capitalize text-secondary'}>
        {weatherInfo.description}
      </h5>
    </Fragment>
  )
}
