'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import Link from 'next/link'

import BtnSubmit from '@/components/ui/btn-submit'
import InputAuth from '@/components/ui/input-auth'

import { registerWithCredentials } from '@/libs/actions'

export default function FormSignUp() {
  const [state, dispatch] = useFormState(registerWithCredentials, null)

  useEffect(() => {
    if (state?.result === 'ok') {
      window.location.href = '/'
    }
  }, [state])

  return (
    <form
      action={dispatch}
      autoComplete='off'
      className='flex w-full max-w-sm flex-col gap-3'
    >
      <div>
        <h1 className='text-center text-xl font-bold'>Weather Query</h1>
        <h4 className='text-sm text-primary/40'>
          Join us to access your personalized weather updates and forecasts.
        </h4>
      </div>

      <InputAuth
        label='Name'
        type='text'
        name='name'
        error={state?.errors?.name}
      />
      <InputAuth
        label='Email'
        type='email'
        name='email'
        error={state?.errors?.email}
      />
      <InputAuth
        label='Password'
        type='password'
        name='newPass'
        error={state?.errors?.newPass}
      />
      <InputAuth
        label='Repeat password'
        type='password'
        name='repeatPass'
        error={state?.errors?.repeatPass}
      />

      <BtnSubmit>Register</BtnSubmit>

      <div>
        <p className='text-sm text-secondary-foreground/60'>
          Already have an account?
          <span className='text-secondary-foreground hover:underline'>
            <Link href={'/auth/signin'}> Sign in here</Link>
          </span>
        </p>
      </div>
    </form>
  )
}
