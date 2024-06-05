import { useEffect, useState } from 'react'

import { baseApi } from '@/shared/lib/baseApi'

export interface Comment {
  id: number
  content: string
  createdAt: string
  user: {
    id: number
    firstName: string
    lastName: string
    avatar: string
  }
}

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  comments: Comment[]
}

export const useFetchPost = (id: string | undefined) => {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setLoading] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get(`/post/${id}`)
      const data = response.data
      setPost(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const addComments = (comment: Comment) => {
    if (post) {
      setPost({ ...post, comments: [comment, ...post.comments] })
    }
  }

  useEffect(() => {
    if (id) fetchPosts()
  }, [])

  return { post, isLoading, addComments }
}
