import { Suspense, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { routeConfig } from '../config'

export const AppRouter = () => {
  const location = useLocation()

  // useLayoutEffect(() => {
  //   document.documentElement.scrollTo(0, 0)
  // }, [location.pathname])

  return (
    <>
      <Suspense fallback={<>loading ...</>}>
        <Routes>
          {Object.values(routeConfig).map(({ element, path }) => (
            <Route key={path} element={element} path={path} />
          ))}
        </Routes>
      </Suspense>
    </>
  )
}
