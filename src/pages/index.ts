import { lazy } from 'react'

export const HomePage = lazy(() => import('./Home'))
export const SignUpPage = lazy(() => import('./SignUp/SignUp'))
export const SignInPage = lazy(() => import('./SignIn'))
export const ErrorPage = lazy(() => import('./Error'))
