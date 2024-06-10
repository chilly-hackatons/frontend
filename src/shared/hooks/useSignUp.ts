import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthUser } from '@/app/providers/auth'
import { RoutePath } from '@/app/providers/router/config'
import { signUp } from '@/entities/auth/api'
import { UserSignUpContext } from '@/entities/auth/dto'
import { useToast } from '@/shared/ui/use-toast'

export const useSignUp = () => {
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const { toast } = useToast()

  const { handleAuth, handleUser } = useAuthUser()

  const signUpUser = async (body: UserSignUpContext) => {
    let user
    if (body.technologies) {
      const technologies = body.technologies.map(
        (tag: { value: string; label: string }) => tag.label,
      )

      user = {
        ...body,
        technologies,
      }
    } else {
      user = body
    }

    setLoading(true)
    try {
      const response = await signUp(user)

      setError(false)
      setErrorMessage('')
      if (response.status === 201) {
        localStorage.setItem('token', response.data.accessToken)
        handleUser(response.data.user)
        handleAuth()
        toast({
          title: 'Вы успешно зарегистрировались 🎉',
        })

        navigate(RoutePath.home)
      }
    } catch (error_) {
      const error = error_ as AxiosError
      setError(true)
      toast({
        variant: 'destructive',
        title: 'О нет! Что то пошло не так',
        description: 'Ошибка при регистрации.',
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
    signUpUser,
  }
}
