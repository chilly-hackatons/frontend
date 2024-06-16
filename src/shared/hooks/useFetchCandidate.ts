import { useEffect, useState } from 'react'

import { UserCandidate } from '@/entities/auth/dto'
import { baseApi } from '@/shared/lib/baseApi'

export const useFetchCandidate = (id: string | undefined) => {
  const [candidate, setCandidate] = useState<Omit<
    UserCandidate,
    'status'
  > | null>(null)
  const [isLoading, setLoading] = useState(false)

  const fetchCandidate = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get(`/candidates/${id}`)
      const data = response.data
      setCandidate(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchCandidate()
  }, [])

  return { candidate, isLoading }
}
