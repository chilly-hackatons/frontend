import { Suspense, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { Header } from '@/widgets/Header/Header'

import { routeConfig } from '../config'

export const AppRouter = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])

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
