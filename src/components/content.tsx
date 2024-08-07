'use client'

import { useState } from 'react'

import { CardSkeleton } from './ui/skeletons'
import dynamic from 'next/dynamic'

import { useFetcher } from '@/hooks/use-fetcher'

import CitySearch from '@/components/widgets/city-search'
import CurrentPrecipitations from '@/components/widgets/current-precipitations'
import CurrentWindSpeed from '@/components/widgets/current-wind-speed'
import TodaysForecast from '@/components/widgets/todays-forecast'

import { City } from '@/types'
import { WeatherData } from '@/types/weather'

const DynamicPastForecast = dynamic(() => import('./widgets/past-forecast'), {
  ssr: false,
})
const LazyMap = dynamic(() => import('@/components/widgets/map'), {
  ssr: false,
  loading: () => <CardSkeleton />,
})
const LazyChartTemperatures = dynamic(
  () => import('@/components/widgets/chart-temperatures'),
  {
    ssr: false,
    loading: () => <CardSkeleton />,
  }
)
const LazyChartHumidity = dynamic(
  () => import('@/components/widgets/chart-humidity'),
  {
    ssr: false,
    loading: () => <CardSkeleton />,
  }
)

const urlParams = (coordinates: { lat: number; long: number }) =>
  `?latitude=${coordinates.lat}&longitude=${coordinates.long}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,rain`
export default function Content() {
  const [city, setCity] = useState<City>({
    name: 'Málaga',
    coordinates: { lat: 36.72, long: -4.42 },
  })

  const { data: weather, loading } = useFetcher<WeatherData>(
    `${process.env.NEXT_PUBLIC_OPENM_API_URL}/forecast${urlParams(city.coordinates)}`
  )

  // const weather = data as WeatherData
  // const weather = localData as WeatherData

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
            {!weather
              ? 'Loading'
              : weather?.current?.cloud_cover < 50
                ? 'Sunny'
                : 'Cloudy'}{' '}
            <br />
            weather in {city.name}
          </h1>
          <div className='py-10'>
            <TodaysForecast weather={weather} loading={!weather || loading} />
            <div className='mt-6 grid grid-cols-2 gap-6'>
              <CurrentWindSpeed weather={weather} />
              <CurrentPrecipitations weather={weather} />
              <LazyChartTemperatures
                weather={weather}
                loading={!weather || loading}
              />
              <LazyChartHumidity
                weather={weather}
                loading={!weather || loading}
              />
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
