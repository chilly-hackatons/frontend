import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'

interface PostProps {
  id: number
  title: string
  content: string
  createdAt: string
}

export const Post = ({ content, title, createdAt }: PostProps) => {
  return (
    <div>
      <Card
        bordered
        className="transition-all hover:bg-accent cursor-pointer overflow-hidden max-h-[350px]"
      >
        <CardHeader>
          <CardTitle className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
            {title}
          </CardTitle>
          <CardDescription>
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: ru,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <article className="prose">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  )
}
