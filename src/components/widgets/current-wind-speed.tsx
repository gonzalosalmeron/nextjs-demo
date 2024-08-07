import { SvgCompass, SvgWindSpeed } from '@/components/svgs'
import Card from '@/components/ui/card'

import { WeatherData } from '@/types/weather'

export default function CurrentWindSpeed({
  weather,
  loading,
}: {
  weather: WeatherData | null
  loading?: boolean
}) {
  const speed = weather?.current?.wind_speed_10m ?? 0
  const speedUnits = weather?.current_units?.wind_speed_10m ?? 'km/h'
  const direction = weather?.current?.wind_direction_10m ?? 0
  const description = () => {
    if (speed < 10)
      return `Breeze barely moving, wind speed is at a gentle ${speed} ${speedUnits}. A perfect day for a hat! 🎩`
    if (speed < 30)
      return `Light wind at ${speed} ${speedUnits}, enough to tousle your hair but not your spirits! 🍃 Hold onto your papers, though.`
    if (speed < 60)
      return `Moderate wind alert! We're looking at ${speed} ${speedUnits}. It's the kind of wind that makes walking feel like a workout! 💪`
    return `Batten down the hatches! Heavy wind speed of ${speed} ${speedUnits} is here. 🌪️ 💀 Secure loose objects and hold onto your hats, folks!`
  }

  return (
    <Card
      icon={<SvgWindSpeed className='h-4 w-4' />}
      title='Wind Speed'
      description={description()}
      loading={loading}
    >
      <div className='flex items-center justify-center'>
        <SvgCompass deg={direction} className='h-28 w-28' />
      </div>
    </Card>
  )
}
