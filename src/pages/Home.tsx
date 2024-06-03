import { useFetchPosts } from '@/shared/hooks/useFetchPosts'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { Post } from '@/shared/ui/post'

const Home = () => {
  const { posts, isLoading } = useFetchPosts()

  if (isLoading) {
    return (
      <div className="container p-4 flex animate-fade min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <div className="container p-4 flex animate-fade">
      <div className="flex flex-col gap-12 w-[70%]">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home
