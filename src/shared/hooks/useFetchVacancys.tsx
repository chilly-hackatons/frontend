import { useEffect, useState } from 'react'

import { baseApi } from '@/shared/lib/baseApi'

interface Vacancy {
  id: number
  title: string
  description: string
  createdAt: string
}

export const useFetchVacancys = () => {
  const [vacancys, setVacancys] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchVacancys = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get('/vacancy')
      const data = response.data
      setVacancys(data)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVacancys()
  }, [])

  return {
    vacancys,
    loading,
    error,
  }
}
