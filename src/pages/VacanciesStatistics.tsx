import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'

import { useAuthUser } from '@/app/providers/auth'
import { RoutePath } from '@/app/providers/router/config'
import { useFetcVacanciesStatistics } from '@/shared/hooks/useFetcVacanciesStatistics'
import { Badge } from '@/shared/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'

const VacanciesStatistics = () => {
  const { user } = useAuthUser()
  const navigate = useNavigate()

  const { isLoading, vacanciesStatistics } = useFetcVacanciesStatistics(user.id)

  const isCandidate = user.type === 'APPLICANT'

  if (isCandidate) navigate(RoutePath.home)

  return (
    <div className="container p-4 animate-fade ">
      {isLoading && <LoadingSpinner />}

      <div className="grid grid-cols-vacanciesStatistics gap-4">
        {vacanciesStatistics.map((vacancy) => (
          <Card
            key={vacancy.id}
            bordered
            className="transition-all hover:bg-accent cursor-pointer overflow-hidden max-h-[350px] flex flex-col justify-around"
          >
            <CardHeader>
              <CardTitle className="line-clamp-2 scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
                {vacancy.title}
              </CardTitle>
              <CardDescription>
                Откликов: {vacancy.applications.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <article className="prose line-clamp-3">
                <ReactMarkdown>
                  {vacancy.description.slice(0, 300)}
                </ReactMarkdown>
              </article>
            </CardContent>
            <CardFooter>
              <Badge>React</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default VacanciesStatistics
