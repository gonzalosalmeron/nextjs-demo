import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'auth'

import { getCurrentUser } from '@/libs/actions'

export default async function CurrentUser() {
  const user = await getCurrentUser()
  return (
    <div className='flex shrink-0 items-center gap-2 pl-2.5'>
      <p>Welcome, {user?.name}</p>
      <div className='flex aspect-square w-7 items-center justify-center rounded-full bg-foreground'>
        <p className='text-sm uppercase text-secondary'>
          {user?.name?.charAt(0)}
        </p>
      </div>
      <form
        action={async () => {
          'use server'
          await signOut({
            redirectTo: '/auth/signin',
          })
        }}
        className='flex items-center'
      >
        <button aria-label='Logout user'>
          <ArrowRightStartOnRectangleIcon className='h-5 w-5' />
        </button>
      </form>
    </div>
  )
}
