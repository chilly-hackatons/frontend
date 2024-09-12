import { createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { RoutePath } from '@/app/providers/router/config'
import { refreshToken } from '@/entities/auth/api'
import { UserDto } from '@/entities/auth/dto'

interface AuthContextProps {
  user: UserDto
  isAuthenticated: boolean
  isLoading: boolean
  checkAuthUser: () => Promise<void>
  handleAuth: () => void
  handleUser: (user: any) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserDto>({} as UserDto)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleAuth = () => {
    setIsAuthenticated(true)
  }

  const handleUser = (user: any) => {
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate(RoutePath.signIn)
  }

  const checkAuthUser = async () => {
    setLoading(true)
    try {
      const response = await refreshToken()
      localStorage.setItem('token', response.data.accessToken)
      setUser(response.data.user)
      setIsAuthenticated(true)
    } catch (error) {
      navigate(RoutePath.signIn)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        checkAuthUser,
        handleAuth,
        handleUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthUser = () => {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error('useAuthUser must be used within an AuthProvider')
  }

  const {
    checkAuthUser,
    user,
    isAuthenticated,
    handleAuth,
    handleUser,
    logout,
    isLoading,
  } = auth

  return {
    checkAuthUser,
    user,
    isAuthenticated,
    handleAuth,
    handleUser,
    isLoading,
    logout,
  }
}
