import { useMemo } from 'react'

import { CalendarDateRangeIcon } from '@heroicons/react/24/outline'
import { FixedSizeList as List } from 'react-window'

import Card from '@/components/ui/card'

export default function PastForecast() {
  const data = useMemo(() => {
    return Array(4000)
      .fill('')
      .map(() => ({
        datetime: new Date(new Date().getTime() - Math.random() * 1e12),
        temperature: Math.random() * (50 - -30) + -30,
        humidity: Math.random() * 100,
      }))
      .sort((a, b) => b.datetime.getTime() - a.datetime.getTime())
  }, [])

  return (
    <Card
      icon={<CalendarDateRangeIcon className='h-4 w-4' />}
      title='Fake Forecast history'
    >
      <div className='grid grid-cols-3'>
        <p>Date time</p>
        <p>Temperature</p>
        <p>Forecast</p>
      </div>
      <List
        itemData={data}
        itemCount={data.length}
        itemSize={40}
        height={180}
        width={'100%'}
      >
        {({ data, index, style }) => {
          return (
            <div
              className='grid grid-cols-3 items-center odd:bg-gray-200/50'
              style={style}
            >
              <p>
                {new Date(data[index].datetime).toLocaleDateString('en-EN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </p>
              <p className='pl-2'>{data[index].temperature.toFixed(1)}º</p>
              <p className='pl-2'>{data[index].humidity.toFixed(1)}%</p>
            </div>
          )
        }}
      </List>
    </Card>
  )
}
