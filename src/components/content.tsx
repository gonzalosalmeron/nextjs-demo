'use client'

import { useState } from 'react'

import useWeather from '@/hooks/use-weather'

import CurrentPrecipitations from '@/components/widgets/current-precipitations'
import CurrentWindSpeed from '@/components/widgets/current-wind-speed'
import TodaysForecast from '@/components/widgets/todays-forecast'

export default function Content() {
  const [city] = useState<{
    name: string
    coordinates: { lat: number; long: number }
  }>({
    name: 'Málaga',
    coordinates: { lat: 36.72, long: -4.42 },
  })
  const weather = useWeather({ coordinates: city.coordinates })

  if (!weather) return null
  return (
    <>
      <div className='mx-auto flex w-full max-w-7xl justify-between gap-10 py-10'>
        {/* LEFT PART */}
        <div className='flex-1 overflow-hidden'>
          <p className='flex items-center gap-2 py-2 pl-1 text-xs'>
            Data updated at {weather?.current?.time?.split('T')?.[1] ?? '--'}
            <span className='animate mb-0.5 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-green-400'>
              <span className='h-2 w-2 shrink-0 animate-ping rounded-full bg-green-400' />
            </span>
          </p>

          <h1 className='text-7xl'>
            {weather?.current?.cloud_cover < 50 ? 'Sunny' : 'Cloudy'} <br />
            weather in Málaga
          </h1>

          <div className='py-10'>
            <TodaysForecast weather={weather} />
            <div className='mt-6 grid grid-cols-2 gap-6'>
              <CurrentWindSpeed weather={weather} />
              <CurrentPrecipitations weather={weather} />
            </div>
          </div>
        </div>
        {/* END LEFT PART */}

        {/* RIGHT */}
        <div className='aspect-square min-w-96 bg-secondary-foreground'></div>
        {/* END RIGHT PART */}
      </div>
    </>
  )
}
