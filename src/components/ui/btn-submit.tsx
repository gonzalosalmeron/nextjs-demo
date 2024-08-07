'use client'

import { useFormStatus } from 'react-dom'

export default function BtnSubmit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <button
      className='mt-2 w-full rounded-lg bg-primary px-4 py-2 text-secondary disabled:cursor-not-allowed'
      disabled={pending}
    >
      {pending ? 'Espere...' : children}
    </button>
  )
}
