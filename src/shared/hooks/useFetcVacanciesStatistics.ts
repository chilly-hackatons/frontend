import { useEffect, useState } from 'react'

import { baseApi } from '@/shared/lib/baseApi'

interface VacancyStatistics {
  id: number
  title: string
  description: string
  createdAt: string
  applications: []
}

export const useFetcVacanciesStatistics = (id: string | number) => {
  const [vacanciesStatistics, setVacanciesStatistics] = useState<
    VacancyStatistics[]
  >([])
  const [isLoading, setLoading] = useState(false)

  const fetchVacanciesStatistics = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get<VacancyStatistics[]>(
        `/vacancy/statistics/${id}`,
      )
      const data = response.data
      setVacanciesStatistics(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVacanciesStatistics()
  }, [])

  return {
    vacanciesStatistics,
    isLoading,
  }
}
