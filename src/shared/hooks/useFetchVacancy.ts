import { useEffect, useState } from 'react'

import { useAuthUser } from '@/app/providers/auth'
import { baseApi } from '@/shared/lib/baseApi'

interface Vacancy {
  id: string
  title: string
  description: string
  isRespondedToVacancy: boolean
  tags: { label: string; value: string }[]
}

export const useFetchVacancy = (id: string | undefined) => {
  const { user } = useAuthUser()
  const [vacancy, setVacancy] = useState<Vacancy | null>(null)
  const [isLoading, setLoading] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get(`/vacancy/${id}?userId=${user.id}`)
      const data = response.data
      setVacancy(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchPosts()
  }, [id])

  return {
    vacancy,
    isLoading,
  }
}
