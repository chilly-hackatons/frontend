import { Link } from 'react-router-dom'

import { useFetchPosts } from '@/shared/hooks/useFetchPosts'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { Post } from '@/shared/ui/post'

const Home = () => {
  const { posts, isLoading } = useFetchPosts()

  if (isLoading) {
    return (
      <div className="container p-4 flex animate-fade min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <div className="container p-4 flex animate-fade">
      <div className="flex flex-col gap-12 w-[70%]">
        {posts.map((post) => (
          <Link
            key={post.id}
            className="cursor-pointer"
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
