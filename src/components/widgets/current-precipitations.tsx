import { SvgWaterDrop } from '@/components/svgs'
import Card from '@/components/ui/card'

import { WeatherData } from '@/types/weather'

export default function CurrentPrecipitations({
  weather,
}: {
  weather: WeatherData
}) {
  const precipitation = weather?.current?.precipitation
  const description = () => {
    if (precipitation < 0.1)
      return 'No precipitation. The sky is so dry, even the clouds need a drink!'
    if (precipitation < 0.5)
      return 'Light precipitation. Just enough to make you regret leaving your umbrella at home.'
    if (precipitation < 0.7)
      return 'Moderate precipitation. It’s raining enough to make you question why you didn’t wear waterproof shoes.'
    return 'Heavy precipitation. Get ready for a downpour! Time to build an ark or at least find some good rain boots.'
  }

  return (
    <Card
      icon={<SvgWaterDrop className='h-4 w-4' />}
      title='Precipitations'
      description={description()}
    >
      <p className='text-center text-lg font-medium'>
        {precipitation?.toFixed(1) ?? '--'}
        {weather?.current_units?.precipitation}
      </p>
    </Card>
  )
}
