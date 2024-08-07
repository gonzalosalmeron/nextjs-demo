'use client'

import { useState } from 'react'

import Card from './ui/card'
import { MapPinIcon } from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'

import useWeather from '@/hooks/use-weather'

import ChartHumidity from '@/components/widgets/chart-humidity'
import ChartTemperatures from '@/components/widgets/chart-temperatures'
import CitySearch from '@/components/widgets/city-search'
import CurrentPrecipitations from '@/components/widgets/current-precipitations'
import CurrentWindSpeed from '@/components/widgets/current-wind-speed'
import TodaysForecast from '@/components/widgets/todays-forecast'

import { City } from '@/types'

const DynamicPastForecast = dynamic(() => import('./widgets/past-forecast'), {
  ssr: false,
})

const LazyMap = dynamic(() => import('@/components/widgets/map'), {
  ssr: false,
  loading: () => (
    <Card icon={<MapPinIcon className='h-4 w-4' />} title='Location'>
      Getting map...
    </Card>
  ),
})

export default function Content() {
  const [city, setCity] = useState<City>({
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
            weather in {city.name}
          </h1>
          <div className='py-10'>
            <TodaysForecast weather={weather} />
            <div className='mt-6 grid grid-cols-2 gap-6'>
              <CurrentWindSpeed weather={weather} />
              <CurrentPrecipitations weather={weather} />
              <ChartTemperatures weather={weather} />
              <ChartHumidity weather={weather} />
            </div>
          </div>

          <DynamicPastForecast />
        </div>
        {/* END LEFT PART */}

        {/* RIGHT */}
        <div className='w-full max-w-xs shrink-0'>
          <div className='sticky top-10 flex flex-col gap-6'>
            <CitySearch city={city} setCity={setCity} />
            <LazyMap
              coordinates={[city.coordinates.lat, city.coordinates.long]}
            />
          </div>
        </div>
        {/* END RIGHT PART */}
      </div>
    </>
  )
}
