import CurrentUser from '@/components/current-user'

export default function Navbar() {
  return (
    <nav className='w-full border-b border-gray-400'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between py-2'>
        <p>National Weather</p>

        <CurrentUser />
      </div>
    </nav>
  )
}
