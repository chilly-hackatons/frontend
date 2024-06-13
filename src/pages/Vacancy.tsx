import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import { useAuthUser } from '@/app/providers/auth'
import { useFetchVacancy } from '@/shared/hooks/useFetchVacancy'
import { baseApi } from '@/shared/lib/baseApi'
import { Badge } from '@/shared/ui/badge'
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
import { toast } from '@/shared/ui/use-toast'

const Vacancy = () => {
  const { user } = useAuthUser()
  const { id } = useParams()

  const { vacancy, isLoading } = useFetchVacancy(id)
  const [isLoadingRespond, setLoadingRespond] = useState(false)
  const [isRespond, setIsRespond] = useState(false)

  const isCandidate = user.type === 'APPLICANT'

  const vacancyRespond = async () => {
    setLoadingRespond(true)

    try {
      await baseApi.patch('vacancy/vacancy-respond', {
        applicantId: Number(user.id),
        vacancyId: Number(id),
      })
      setIsRespond(true)
      toast({ title: 'Вы успешно откликнулись на вакансию' })
    } catch (error) {
      toast({ variant: 'destructive', title: 'Что-то пошло не так' })
    } finally {
      setLoadingRespond(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container justify-center items-center p-4 flex animate-fade min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!vacancy) {
    return <div className="container p-4 animate-fade">Вакансия не найдена</div>
  }

  return (
    <div className="container p-4 animate-fade">
      <Card>
        <CardHeader>
          <CardTitle className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
            {vacancy.title}
          </CardTitle>
          <CardDescription className="flex gap-2 flex-wrap">
            {vacancy.tags.map((tag) => (
              <Badge key={tag.value}>{tag.label}</Badge>
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <article className="prose">
            <ReactMarkdown>{vacancy.description}</ReactMarkdown>
          </article>
        </CardContent>

        {isCandidate && (
          <CardFooter>
            <Button
              loading={isLoadingRespond}
              disabled={vacancy.isRespondedToVacancy || isRespond}
              onClick={vacancyRespond}
              size="lg"
            >
              {vacancy.isRespondedToVacancy || isRespond
                ? 'Вы уже откликнулись'
                : 'Откликнуться'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default Vacancy
