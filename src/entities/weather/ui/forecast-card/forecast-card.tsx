'use client'
import dayjs from 'dayjs'

import { ForecastWeatherList } from '@shared/api'
import { useHorizontalScroll } from '@shared/hooks'

interface Props {
  date: string
  items: ForecastWeatherList[]
}

export const ForecastCard = ({ date, items }: Props) => {
  const formattedDate = dayjs(date).format('DD MMMM, dddd')
  const isToday = dayjs().isSame(date, 'day')
  const scrollRef = useHorizontalScroll<HTMLDivElement>()

  return (
    <div className={`card mb-4 shadow-sm ${isToday ? 'border-primary' : ''}`}>
      <div className={'card-body'}>
        <h5 className={'card-title mb-3'}>
          {formattedDate}
          {isToday && <span className={'badge bg-primary mx-2'}>Today</span>}
        </h5>

        <div
          ref={scrollRef}
          className={'d-flex overflow-auto gap-3 px-3'}
          style={{ marginLeft: '-1rem', marginRight: '-1rem' }}
        >
          {items.map(item => (
            <div
              key={item.dt}
              className={'card text-center p-2 flex-shrink-0'}
              style={{ minWidth: '100px' }}
            >
              <small className={'text-muted mb-1'}>
                {dayjs(item.dt_txt).format('HH:mm')}
              </small>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className={'mx-auto'}
                width={50}
                height={50}
              />
              <div
                className={
                  'd-flex align-items-center justify-content-center mt-1'
                }
              >
                <span>{Math.round(item.main.temp)}°C</span>
              </div>
              <div
                className={
                  'd-flex align-items-center justify-content-center mt-1'
                }
              >
                <span>🌬{Math.round(item.wind.speed)} м/с</span>
              </div>
              <div
                className={
                  'd-flex align-items-center justify-content-center mt-1'
                }
              >
                <span>💧{item.main.humidity}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
