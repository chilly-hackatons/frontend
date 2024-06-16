import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'

import { Badge } from '@/shared/ui/badge'
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
  tags: { value: string; label: string }[]
}

export const Post = ({ content, title, createdAt, tags }: PostProps) => {
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
          <article className="prose line-clamp-5">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </CardContent>
        <CardFooter className="gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag.value} variant="default">
              {tag.label}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </div>
  )
}
