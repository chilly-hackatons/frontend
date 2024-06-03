import { useEffect, useState } from 'react'

import { baseApi } from '@/shared/lib/baseApi'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setLoading] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get('/post')
      const data = response.data
      setPosts(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return { posts, isLoading }
}
