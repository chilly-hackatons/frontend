import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthUser } from '@/app/providers/auth'
import { RoutePath } from '@/app/providers/router/config'
import { signIn } from '@/entities/auth/api'
import { UserSignInDto } from '@/entities/auth/dto'
import { useToast } from '@/shared/ui/use-toast'

export const useSignIn = () => {
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const { toast } = useToast()

  const { handleAuth, handleUser } = useAuthUser()

  const signInUser = async (body: UserSignInDto) => {
    setLoading(true)
    try {
      const response = await signIn(body)

      setError(false)
      setErrorMessage('')
      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken)
        handleUser(response.data.user)
        handleAuth()
        toast({
          title: 'Вы вошли в систему 🎉',
        })

        navigate(RoutePath.home)
      }
    } catch (error_) {
      const error = error_ as AxiosError
      setError(true)
      toast({
        variant: 'destructive',
        title: 'О нет! Что то пошло не так',
        description: 'Ошибка при входе. Попробуйте еще раз.',
      })
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    isLoading,
    isError,
    errorMessage,
    signInUser,
  }
}
