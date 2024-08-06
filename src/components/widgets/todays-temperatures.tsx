import { ClockIcon, CloudIcon, SunIcon } from '@heroicons/react/24/outline'

import Card from '@/components/ui/card'

import { WeatherData } from '@/types/weather'

export default function TodaysTemperatures({
  weather,
}: {
  weather: WeatherData
}) {
  return (
    <Card icon={<ClockIcon className='h-4 w-4' />} title='Hourly forecast'>
      <div className='flex gap-4 overflow-x-auto'>
        {weather?.hourly?.time?.map((value: string, index: number) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center gap-1'
          >
            <p className='text-sm'>
              {weather?.hourly?.temperature_2m?.[index] ?? '--'}º
            </p>
            <>
              {weather?.hourly?.rain[index] < 50 ? (
                <SunIcon className='w-6' />
              ) : (
                <CloudIcon className='w-6' />
              )}
            </>
            <p className='text-base'>{value.split('T')[1]}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
