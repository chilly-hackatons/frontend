import { useEffect, useState } from 'react'

import { baseApi } from '@/shared/lib/baseApi'

interface Vacancy {
  id: number
  title: string
  description: string
  createdAt: string
}

export const useFetchVacancys = (searchQuery?: string) => {
  const [vacancysSearch, setVacancysSearch] = useState<Vacancy[]>([])

  const [vacancys, setVacancys] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchSearchVacancys = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get(
        `/vacancy/search?searchQuery=${searchQuery}`,
      )
      const data = response.data
      setVacancysSearch(data)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

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

  useEffect(() => {
    if (searchQuery) fetchSearchVacancys()
  }, [searchQuery])

  return {
    vacancys: searchQuery ? vacancysSearch : vacancys,
    loading,
    error,
  }
}
