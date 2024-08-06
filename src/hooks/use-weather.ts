import localData from '@/localData.json'
import { WeatherData } from '@/types/weather'

export default function useWeather({
  coordinates,
}: {
  coordinates: { lat: number; long: number }
}): WeatherData | null {
  console.log(coordinates)
  return localData
}
