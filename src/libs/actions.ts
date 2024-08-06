'use server'

import prisma from './db'
import { hashPassword } from './hash'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { auth, signIn } from 'auth'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { ZodError, ZodSchema, z } from 'zod'

/**
 * Get user from database
 * @param email String
 * @returns User | null
 */
export const getUserFromDb = async (email: string) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    })
    return user
  } catch (e) {
    // TODO - LOG INTO SYSTEM
    // ex: elastic search, custom db system, etc
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
      console.error('User not found on database')
    } else {
      console.error(`Error getting user from db ${e}`)
    }

    return null
  }
}

export const authenticateCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const userSchema = z.object({
    email: z.string().email().min(4).max(255),
    password: z.string().min(1).max(255),
  })

  const validate = await validateFormData(
    userSchema,
    Object.fromEntries(formData) as never
  )

  if (validate.result != 'ok')
    return { result: 'error', errors: validate.errors }

  try {
    await signIn('credentials', {
      ...validate.data,
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (isRedirectError(error)) throw error
    return {
      result: 'error',
      errors: { password: 'Invalid email or password' },
    }
  }
}

export const registerWithCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const userSchema = z
    .object({
      name: z.string().min(4).max(100),
      email: z.string().email().min(4).max(255),
      newPass: z.string().min(1).max(255),
      repeatPass: z.string().min(1).max(255),
    })
    .refine((data) => data.newPass === data.repeatPass, {
      message: "Passwords don't match",
      path: ['newPass'],
    })

  const validate = await validateFormData(
    userSchema,
    Object.fromEntries(formData) as never
  )

  if (validate.result != 'ok' || !validate.data)
    return { result: 'error', errors: validate.errors }

  const { name, email, newPass } = validate.data

  // CHEKS IF USER EXISTS, IF NOT, RETURN ERROR
  const userExists = await getUserFromDb(email as string)

  if (userExists) {
    return {
      result: 'error',
      errors: { email: 'Email already registered' },
    }
  }

  try {
    const hashedPass: string = await hashPassword(newPass as string)

    await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: hashedPass,
        role: Math.random() * 1 > 0.5 ? 'user' : 'admin',
      },
    })

    await signIn('credentials', {
      email: email as string,
      password: newPass as string,
      redirectTo: '/dashboard',
    })

    return {
      result: 'ok',
    }
  } catch (error) {
    if (isRedirectError(error)) throw error
    // TODO - register error
    console.error(error)
    return {
      result: 'error',
      errors: { email: 'Service unavailable, try again later.' },
    }
  }
}

export const validateFormData = async (
  schema: ZodSchema,
  formData: { [key: string | number]: string | number | null }
): Promise<{
  result: 'ok' | 'error'
  data?: { [key: string]: string | number }
  errors?: { [key: string]: string }
}> => {
  try {
    const parse = schema.parse(formData)
    return { result: 'ok', data: parse }
  } catch (e) {
    if (e instanceof ZodError) {
      const rawErrors = e.errors
      let errors = {}

      for (const [, { path, message }] of Object.entries(rawErrors)) {
        errors = { ...errors, [path[0]]: message }
      }

      return { result: 'error', errors }
    }
    return { result: 'error', errors: {} }
  }
}

export const getCurrentUser = async () => {
  const session = await auth()

  return session?.user
}
