import { Suspense, useEffect, useLayoutEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { useAuthUser } from '@/app/providers/auth'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { Header } from '@/widgets/Header/Header'

import { routeConfig, RoutePath } from '../config'

export const AppRouter = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { checkAuthUser, isLoading } = useAuthUser()

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuthUser()
    } else {
      navigate(RoutePath.signIn)
    }
  }, [])

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )

  return (
    <>
      <Header />

      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          {Object.values(routeConfig).map(({ element, path }) => (
            <Route key={path} element={element} path={path} />
          ))}
        </Routes>
      </Suspense>
    </>
  )
}
