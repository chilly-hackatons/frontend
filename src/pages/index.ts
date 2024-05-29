import { lazy } from 'react'

export const HomePage = lazy(() => import('./Home'))
export const SignUpPage = lazy(() => import('./SignUp'))
export const SignInPage = lazy(() => import('./SignIn'))
export const ErrorPage = lazy(() => import('./Error'))
