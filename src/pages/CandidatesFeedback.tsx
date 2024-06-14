import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { UserCandidate } from '@/entities/auth/dto'
import { cn } from '@/lib/utils'
import { useFetchCandidatesFeedback } from '@/shared/hooks/useFetchCandidatesFeedback'
import { baseApi } from '@/shared/lib/baseApi'
import { calculateTotalExperience } from '@/shared/lib/calculateTotalExperience'
import { Badge } from '@/shared/ui/badge'
import { FeedbackStatus } from '@/shared/ui/feedback-status'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { CandidatesFeedbackInfo } from '@/widgets/CandidatesFeedback/CandidatesFeedback'

const CandidatesFeedback = () => {
  const { vacancyId } = useParams()
  const [filterBy, setFilterBy] = useState('ALL')

  const { feedbacks, loading, refetch } = useFetchCandidatesFeedback(
    vacancyId,
    filterBy,
  )

  const [selectedFeedback, setSelectedFeedback] =
    useState<UserCandidate | null>(null)

  const isFeedbacksEmpty = feedbacks.length === 0

  const handleFilterBy = (value: string) => {
    setFilterBy(value)
  }

  const updateStatus = async (
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL',
    userId: number,
  ): Promise<
    AxiosResponse<{ status: 'PENDING' | 'APPROVED' | 'REJECTED' }>
  > => {
    try {
      const response = await baseApi.patch(
        `candidates/candidates-feedback/${vacancyId}`,
        {
          status,
          userId,
        },
      )
      await refetch()

      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    if (feedbacks.length > 0) {
      setSelectedFeedback(feedbacks[0])
    }
  }, [feedbacks])

  if (loading) {
    return (
      <div className="container p-4 justify-center items-center flex animate-fade ">
        <LoadingSpinner />
      </div>
    )
  }

  if (isFeedbacksEmpty && filterBy === 'ALL') {
    return (
      <div className="container p-4 justify-center items-center flex animate-fade ">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          🥺 Пока что никто не откликнулся 🥺
        </h3>
      </div>
    )
  }

  return (
    <div className=" p-8 flex animate-fade gap-4">
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Фильтры
        </h3>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge
            onClick={() => handleFilterBy('ALL')}
            className="cursor-pointer"
          >
            Все
          </Badge>
          <Badge
            onClick={() => handleFilterBy('PENDING')}
            className="cursor-pointer"
            variant="waiting"
          >
            В ожидании
          </Badge>
          <Badge
            onClick={() => handleFilterBy('APPROVED')}
            className="cursor-pointer"
            variant="success"
          >
            Одобрен
          </Badge>
          <Badge
            onClick={() => handleFilterBy('REJECTED')}
            className="cursor-pointer"
            variant="destructive"
          >
            Отказ
          </Badge>
        </div>

        {isFeedbacksEmpty && (
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Пусто 🥺
          </h3>
        )}

        {!isFeedbacksEmpty && (
          <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2">
              {feedbacks.map((feedback) => (
                <button
                  key={feedback.id}
                  onClick={() => setSelectedFeedback(feedback)}
                  className={cn(
                    'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent justify-around animate-fade w-full',
                    {
                      'bg-accent': feedback.id === selectedFeedback?.id,
                    },
                  )}
                >
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">
                          {feedback.firstName}
                        </div>
                        <FeedbackStatus status={feedback.status} />
                      </div>
                      <div className="ml-auto">
                        <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                          {calculateTotalExperience(feedback.jobExperience)}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="line-clamp-3 text-sm">
                    {feedback.about.slice(0, 200)}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {feedback.skills.map((skill) => (
                      <Badge key={skill.value}>{skill.label}</Badge>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      {selectedFeedback && !isFeedbacksEmpty && (
        <CandidatesFeedbackInfo
          vacancyId={Number(vacancyId)}
          user={selectedFeedback}
          updateStatus={updateStatus}
        />
      )}
    </div>
  )
}

export default CandidatesFeedback
