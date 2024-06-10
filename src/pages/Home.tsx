import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchPosts } from '@/shared/hooks/useFetchPosts'
import { Input } from '@/shared/ui/input'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { useDebounce } from '@/shared/ui/multi-select'
import { Post } from '@/shared/ui/post'

const Home = () => {
  const [search, setSearch] = useState('')

  const searchDebouncedValue = useDebounce(search, 500)

  const { posts, isLoading } = useFetchPosts(searchDebouncedValue)

  const isPostsEmpty = posts.length === 0

  return (
    <div className="container p-4 flex animate-fade flex-col gap-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск"
      />
      <div className="flex flex-col gap-12 ">
        {isLoading && (
          <div className="p-4 flex animate-fade items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        {isPostsEmpty && search && !isLoading && (
          <div className="flex items-center justify-center mt-20 animate-fade">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              🥺 Ничего не найдено 🥺
            </h3>
          </div>
        )}

        {posts.map((post) => (
          <Link
            key={post.id}
            className="cursor-pointer animate-fade"
            to={`/post/${post.id}`}
          >
            <Post key={post.id} {...post} />
          </Link>
        ))}
      </div>
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home
