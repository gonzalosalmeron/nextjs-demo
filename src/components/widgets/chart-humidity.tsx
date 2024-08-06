import { SvgTemperature } from '../svgs'
import ChartLines from './chart-lines'

import Card from '@/components/ui/card'

import { WeatherData } from '@/types/weather'

export default function ChartHumidity({ weather }: { weather: WeatherData }) {
  return (
    <Card
      icon={<SvgTemperature className='h-5 w-5' />}
      title='Humedity next 6 days'
    >
      <ChartLines
        data={{
          labels: weather?.hourly.time.map((value) =>
            new Date(value).toDateString()
          ),
          datasets: [
            {
              data: weather?.hourly.relative_humidity_2m,
              label: 'Humidity %',
              backgroundColor: '#D81C5D80',
              borderColor: '#D81C5D',
            },
          ],
        }}
      />
    </Card>
  )
}
