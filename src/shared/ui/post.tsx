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
      <Card bordered className="transition-all hover:bg-accent cursor-pointer">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: ru,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReactMarkdown>{content}</ReactMarkdown>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  )
}
