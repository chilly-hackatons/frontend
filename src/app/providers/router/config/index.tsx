import { RouteProps } from 'react-router-dom'

import { ErrorPage, HomePage, SignInPage, SignUpPage } from '@/pages'

enum AppRoutes {
  HOME = 'home',
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
  NOTFOUND = 'notFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.SIGN_IN]: '/sign-in',
  [AppRoutes.SIGN_UP]: '/sign-up',
  [AppRoutes.NOTFOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <HomePage />,
  },
  [AppRoutes.SIGN_IN]: {
    path: RoutePath.signIn,
    element: <SignInPage />,
  },
  [AppRoutes.SIGN_UP]: {
    path: RoutePath.signUp,
    element: <SignUpPage />,
  },
  [AppRoutes.NOTFOUND]: {
    path: RoutePath.notFound,
    element: <ErrorPage />,
  },
}
