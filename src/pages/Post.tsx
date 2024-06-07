import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import { MessageCirclePlus } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import { CreateComment } from '@/features/Post/create-comment'
import { useFetchPost } from '@/shared/hooks/useFetchPost'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'

const Post = () => {
  const { id } = useParams()
  const [open, setOpen] = useState(false)

  const { post, isLoading, addComments } = useFetchPost(id)

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen items-center animate-fade ">
        <LoadingSpinner />
      </div>
    )
  }

  if (!post) {
    return <div className="container p-4 animate-fade ">Пост не найден</div>
  }

  return (
    <div className="container p-4  animate-fade ">
      <Card>
        <CardHeader>
          <CardTitle className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
            {post.title}
          </CardTitle>
          <CardDescription>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: ru,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <article className="prose">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </CardContent>
        <CardFooter />
      </Card>

      <div>
        <div className="flex justify-between items-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
            Комментарии
          </h3>

          <Button onClick={() => setOpen(true)}>
            <MessageCirclePlus className="mr-2 h-4 w-4" />
            Добавить комментарий
          </Button>
        </div>
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm w-full"
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">
                      {comment.user.firstName}
                    </div>
                  </div>
                  <div className="ml-auto text-xs">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: ru,
                    })}
                  </div>
                </div>
              </div>
              <div className="line-clamp-4 text-lg">{comment.content}</div>
            </div>
          ))}
        </div>
      </div>

      <CreateComment addComments={addComments} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Post
