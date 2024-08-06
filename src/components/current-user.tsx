import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'auth'

import Card from '@/components/ui/card'

import { getCurrentUser } from '@/libs/actions'

export default async function CurrentUser() {
  const user = await getCurrentUser()
  return (
    <Card className='flex items-center gap-2 pl-2.5'>
      <p>Welcome, {user?.name}</p>
      <div className='flex aspect-square w-7 items-center justify-center rounded-full bg-foreground'>
        <p className='text-sm uppercase text-secondary'>
          {user?.name?.charAt(0)}
        </p>
      </div>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
        className='flex items-center'
      >
        <button>
          <ArrowRightStartOnRectangleIcon className='h-5 w-5' />
        </button>
      </form>
    </Card>
  )
}
