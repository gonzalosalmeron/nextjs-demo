import dynamic from 'next/dynamic'

import CurrentUser from '@/components/current-user'
import { SvgSun } from '@/components/svgs'

const LazySwitchTheme = dynamic(() => import('@/components/ui/switch-theme'), {
  loading: () => (
    <button>
      <SvgSun className='h-5 w-5' />
    </button>
  ),
  ssr: false,
})

export default function Navbar() {
  return (
    <nav className='w-full border-b border-gray-400'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between py-2'>
        <p>National Weather</p>

        <div className='flex items-center'>
          <LazySwitchTheme />
          <CurrentUser />
        </div>
      </div>
    </nav>
  )
}
