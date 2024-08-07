'use client'

import { Suspense } from 'react'
import { useFormState } from 'react-dom'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import BtnSubmit from '@/components/ui/btn-submit'
import InputAuth from '@/components/ui/input-auth'

import { authenticateCredentials } from '@/libs/actions'

export default function FormSignIn() {
  const [state, dispatch] = useFormState(authenticateCredentials, null)

  return (
    <form action={dispatch} className='flex w-full max-w-sm flex-col gap-3'>
      <div>
        <h1 className='text-center text-xl font-bold'>Weather Query</h1>
        <h4 className='text-sm text-primary/40'>
          Log in to access your personalized weather updates and forecasts.
        </h4>
      </div>

      <InputAuth
        label='Email'
        type='email'
        name='email'
        autoComplete='username'
        error={state?.errors?.email}
        data-cy='input-email'
      />
      <InputAuth
        label='Password'
        type='password'
        name='password'
        autoComplete='current-password'
        error={state?.errors?.password}
      />
      <Suspense>{!state?.errors && <ShowRedirectErrors />}</Suspense>
      <BtnSubmit>Login</BtnSubmit>

      <div>
        <p className='text-sm text-secondary-foreground/60'>
          Dont have an account?
          <span className='text-secondary-foreground hover:underline'>
            <Link href={'/auth/signup'}> Sign up here</Link>
          </span>
        </p>
      </div>
    </form>
  )
}

const ShowRedirectErrors = () => {
  const params = useSearchParams()

  return <p className='text-xs text-red-500'>{params.get('error')}</p>
}
