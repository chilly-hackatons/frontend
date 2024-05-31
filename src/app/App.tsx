import './global.css'

import { AuthProvider } from '@/app/providers/auth'
import { WrapperComposer } from '@/shared/lib/ProviderList'

import { AppRouter, ErrorBoundary, RouterWrapper } from './providers'

export const App = () => {
  return (
    <WrapperComposer
      wrappers={[RouterWrapper, AuthProvider, ErrorBoundary]}
      render={() => <AppRouter />}
    />
  )
}
