export interface WeatherData {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    is_day: string
    precipitation: string
    rain: string
    cloud_cover: string
    wind_speed_10m: string
    wind_direction_10m: string
  }
  current: {
    time: string
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    is_day: number
    precipitation: number
    rain: number
    cloud_cover: number
    wind_speed_10m: number
    wind_direction_10m: number
  }
  hourly_units: {
    time: string
    temperature_2m: string
    relative_humidity_2m: string
    rain: string
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    rain: number[]
  }
}
