import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import { useAuthUser } from '@/app/providers/auth'
import { useFetchVacancy } from '@/shared/hooks/useFetchVacancy'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'

const Vacancy = () => {
  const { user } = useAuthUser()
  const { id } = useParams()

  const { vacancy, isLoading } = useFetchVacancy(id)

  const isCandidate = user.type === 'APPLICANT'

  if (isLoading) {
    return (
      <div className="container p-4 flex animate-fade min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container p-4 animate-fade">
      <Card>
        <CardHeader>
          <CardTitle className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
            {vacancy.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <article className="prose">
            <ReactMarkdown>{vacancy.description}</ReactMarkdown>
          </article>
        </CardContent>

        {isCandidate && (
          <CardFooter>
            <Button size="lg">Откликнуться</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default Vacancy
