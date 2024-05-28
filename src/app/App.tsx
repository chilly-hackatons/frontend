import { WrapperComposer } from '@/shared/lib/ProviderList'

import { AppRouter, ErrorBoundary, RouterWrapper } from './providers'

export const App = () => {
  return (
    <WrapperComposer
      wrappers={[RouterWrapper, ErrorBoundary]}
      render={() => <AppRouter />}
    />
  )
}
