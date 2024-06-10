import { useEffect, useState } from 'react'

import { baseApi } from '@/shared/lib/baseApi'

interface Candidate {
  id: number
  avatar: string | null
  about: string
  createdAt: string
  email: string
  firstName: string
  gitHubLink: string
  jobExperience: []
  lastName: string
  patronymic: string
  skills: Array<{ label: string; value: string }>
}

export const useFetchCandidates = (searchQuery?: string) => {
  const [candidatesSearch, setCandidatesSearch] = useState<Candidate[]>([])

  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchSearchVacancys = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get(
        `/candidates/search?searchQuery=${searchQuery}`,
      )
      const data = response.data
      setCandidatesSearch(data)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchVacancys = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get('/candidates')
      const data = response.data
      setCandidates(data)
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
    candidates: searchQuery ? candidatesSearch : candidates,
    loading,
    error,
  }
}
