import { SvgTemperature } from '../svgs'
import ChartLines from './chart-lines'

import Card from '@/components/ui/card'

import { WeatherData } from '@/types/weather'

export default function ChartTemperatures({
  weather,
  loading,
}: {
  weather: WeatherData | null
  loading: boolean
}) {
  return (
    <Card
      icon={<SvgTemperature className='h-5 w-5' />}
      title='Temperatures next 6 days'
      loading={loading}
    >
      <ChartLines
        data={{
          labels: weather?.hourly.time.map((value) =>
            new Date(value).toDateString()
          ),
          datasets: [
            {
              data: weather?.hourly.temperature_2m ?? [],
              label: 'Temperature °C',
            },
          ],
        }}
      />
    </Card>
  )
}
