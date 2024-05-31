import axios from 'axios'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { RoutePath } from '@/app/providers/router/config'
import { RefereshTokenDto, UserDto } from '@/entities/auth/dto'
import { urlApi } from '@/shared/lib/baseApi'

interface AuthContextProps {
  user: UserDto | null
  isAuthenticated: boolean
  checkAuthUser: () => Promise<void>
  handleAuth: () => void
  handleUser: (user: any) => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserDto | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()

  const handleAuth = () => {
    setIsAuthenticated(true)
  }

  const handleUser = (user: any) => {
    setUser(user)
  }

  const checkAuthUser = async () => {
    try {
      const response = await axios.post<RefereshTokenDto>(
        `${urlApi}/auth/refresh`,
        {},
        {
          headers: {
            'Secret-Access-Token': import.meta.env.VITE_BASE_AUTH_KEY,
          },
          withCredentials: true,
        },
      )
      localStorage.setItem('token', response.data.accessToken)
      setUser(response.data.user)
      setIsAuthenticated(true)
    } catch (error) {
      navigate(RoutePath.signIn)
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuthUser()
    } else {
      navigate(RoutePath.signIn)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        checkAuthUser,
        handleAuth,
        handleUser,
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

  const { checkAuthUser, user, isAuthenticated, handleAuth, handleUser } = auth

  return { checkAuthUser, user, isAuthenticated, handleAuth, handleUser }
}
