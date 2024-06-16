import { useEffect, useState } from 'react'

import { baseApi } from '@/shared/lib/baseApi'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  tags: { value: string; label: string }[]
}

export const useFetchPosts = (searchQuery?: string) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [postsSearch, setPostsSearch] = useState<Post[]>([])

  const [isLoading, setLoading] = useState(false)

  const fetchSearchPosts = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get(
        `/post/search?searchQuery=${searchQuery}`,
      )
      const data = response.data
      setPostsSearch(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

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

  useEffect(() => {
    if (searchQuery) fetchSearchPosts()
  }, [searchQuery])

  return { posts: searchQuery ? postsSearch : posts, isLoading }
}
