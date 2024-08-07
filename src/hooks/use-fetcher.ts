import { useCallback, useEffect, useState } from 'react'

interface UseFetcherOptions {
  cacheTTL?: number // Cache time in milliseconds
  debounce?: number // Debounce time in milliseconds
}

export const useFetcher = <T>(url: string, options: UseFetcherOptions = {}) => {
  const { cacheTTL = 5 * 60 * 1000, debounce = 1000 } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Error fetching api')
      }
      const result: T = await response.json()
      setData(result)

      // cache results in localstorage
      localStorage.setItem(
        url,
        JSON.stringify({
          data: result,
          timestamp: Date.now(),
        })
      )
    } catch {
      setError('Error fetching api')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    // get from cache or call to api
    const cachedData = localStorage.getItem(url)
    if (cachedData) {
      const { data: cachedDataValue, timestamp } = JSON.parse(cachedData)
      if (Date.now() - timestamp < cacheTTL) {
        setData(cachedDataValue)
        return
      }
    }

    const handler = setTimeout(() => {
      fetchData()
    }, debounce)

    return () => {
      clearTimeout(handler)
    }
  }, [fetchData, url, cacheTTL, debounce])

  return { data, loading, error }
}
