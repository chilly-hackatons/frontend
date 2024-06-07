import { useEffect, useState } from 'react'

import { baseApi } from '@/shared/lib/baseApi'

interface Vacancy {
  id: string
  title: string
  description: string
}

export const useFetchVacancy = (id: string | undefined) => {
  const [vacancy, setVacancy] = useState<Vacancy>({} as Vacancy)
  const [isLoading, setLoading] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get(`/vacancy/${id}`)
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

  return { vacancy, isLoading }
}
