import { Dispatch, SetStateAction, useEffect, useId, useState } from 'react'

import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline'

import { useFetcher } from '@/hooks/use-fetcher'

import { City } from '@/types'
import { NominatimResponse } from '@/types/nominatim'

export default function CitySearch({
  setCity,
}: {
  city: City
  setCity: Dispatch<SetStateAction<City>>
}) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { data, loading, error } = useFetcher<NominatimResponse[] | null>(
    search.length > 2
      ? `${process.env.NEXT_PUBLIC_NOMINATIM_API_URL}?q=${search}&format=json`
      : '',
    {
      debounce: 800,
    }
  )
  const uniqueId = useId().slice(1, -1)
  const id = `${uniqueId}-city-search`

  const handleMenu = (e: MouseEvent | KeyboardEvent) => {
    const { target } = e
    if (
      (target as HTMLElement)?.closest(`#${id}-container`) &&
      (e as KeyboardEvent)?.key != 'Escape'
    )
      return false
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleMenu)
    document.addEventListener('keydown', handleMenu)
    return () => {
      document.removeEventListener('click', handleMenu)
      document.removeEventListener('keydown', handleMenu)
    }
  })

  const handleSelection = (place: NominatimResponse) => {
    setSearch('')
    setIsOpen(false)
    setCity({
      name: place?.name ?? 'unknown place',
      coordinates: {
        lat: Number(place?.lat) ?? 0,
        long: Number(place?.lon) ?? 0,
      },
    })
  }

  return (
    <div id={`${id}-container`}>
      <label className='flex items-center gap-2 border-b px-2 pb-0.5'>
        <span className='sr-only'>Search a city</span>
        <input
          placeholder='Search a city...'
          className='w-full bg-transparent outline-none'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => !isOpen && setIsOpen(true)}
        />
        <MagnifyingGlassIcon className='h-5 w-5' />
      </label>

      {isOpen && (
        <div className='absolute z-[9999999] mt-2 max-h-96 w-full overflow-y-auto rounded-lg border border-gray-100 bg-background py-2'>
          {loading && !error ? (
            <p>Loading...</p>
          ) : (
            <>
              {data && data?.length > 0 ? (
                <div className='flex flex-col'>
                  {data?.map((item, i) => (
                    <div
                      key={i}
                      className='cursor-pointer border-b px-4 py-2 hover:bg-secondary'
                      onClick={() => handleSelection(item)}
                    >
                      <p className='flex items-center gap-1 text-secondary-foreground'>
                        <MapPinIcon className='h-4 w-4' />
                        {item?.name ?? 'unknown place'}
                      </p>
                      <p className='text-sm text-secondary-foreground/40'>
                        {item?.display_name ?? 'unknown place'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='px-4 text-sm text-secondary-foreground'>
                  No results found
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
