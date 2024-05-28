import { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { ProviderProps } from '@/shared/types'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundaryComponent extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  state: ErrorBoundaryState = { hasError: false }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  render() {
    const { hasError, error } = this.state
    if (hasError) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100dvh',
          }}
        >
          <h1>🛠️ Error 🛠️</h1>
          <h2>{error?.message}</h2>
          <Link to="/">Вернуться на главную</Link>
        </div>
      )
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children
  }
}

export const ErrorBoundary = ({ children }: ProviderProps) => {
  return <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>
}
