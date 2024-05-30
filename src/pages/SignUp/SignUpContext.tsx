import { createContext, useContext, useState } from 'react'

type UserType = 'candidate' | 'recruiter'
type UserContextWithFunctions = User & {
  logUser: () => void
  updateUser: (data: any) => void
}

interface User {
  first_name: string
  last_name: string
  patronymic: string
  email: string
  password: string
  about: string
  user_type: UserType

  company_name?: string

  github_link?: string
  skills?: Array<{
    lable: string
    value: string
  }>
}

interface SignUpProviderProps {
  children: React.ReactNode
}

const SignUpContext = createContext<UserContextWithFunctions>(
  {} as UserContextWithFunctions,
)

export const SignUpProvider = ({ children }: SignUpProviderProps) => {
  const [user, setUser] = useState<UserContextWithFunctions>(
    {} as UserContextWithFunctions,
  )

  const updateUser = (data: User) => {
    setUser({ ...user, ...data })
    localStorage.setItem('user', JSON.stringify({ ...user, ...data }))
  }

  const logUser = () => {
    console.log(user)
  }

  return (
    <SignUpContext.Provider value={{ ...user, updateUser, logUser }}>
      {children}
    </SignUpContext.Provider>
  )
}

export const useSignUp = () => {
  const context = useContext(SignUpContext)

  if (!context) {
    throw new Error('useSignUp must be used within a SignUpProvider')
  }

  const { logUser, updateUser, ...otherValues } = context

  return { logUser, updateUser, user: otherValues }
}
