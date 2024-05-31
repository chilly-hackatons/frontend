import { BrowserRouter } from 'react-router-dom'

import { ProviderProps } from '@/shared/types'
import { Toaster } from '@/shared/ui/toaster'

export const RouterWrapper = ({ children }: ProviderProps) => {
  return (
    <BrowserRouter>
      <Toaster />
      {children}
    </BrowserRouter>
  )
}
