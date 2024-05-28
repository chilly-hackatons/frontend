import { RouteProps } from 'react-router-dom'

import { ErrorPage, HomePage } from '@/pages'

enum AppRoutes {
  HOME = 'home',
  NOTFOUND = 'notFound',
}

const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.NOTFOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <HomePage />,
  },
  [AppRoutes.NOTFOUND]: {
    path: RoutePath.notFound,
    element: <ErrorPage />,
  },
}
