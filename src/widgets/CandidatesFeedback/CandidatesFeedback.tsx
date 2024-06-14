import { AxiosResponse } from 'axios'
import { Github } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { UserCandidate } from '@/entities/auth/dto'
import { baseApi } from '@/shared/lib/baseApi'
import { Badge } from '@/shared/ui/badge'
import { JobExprecienceStory } from '@/shared/ui/job-experience-story'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { toast } from '@/shared/ui/use-toast'

interface CandidatesFeedbackProps {
  user: UserCandidate
  updateStatus: (
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL',
    userId: number,
  ) => Promise<AxiosResponse<{ status: 'PENDING' | 'APPROVED' | 'REJECTED' }>>
  vacancyId: number
}

export const CandidatesFeedbackInfo = ({
  user,
  updateStatus,
  vacancyId,
}: CandidatesFeedbackProps) => {
  const [status, setStatus] = useState<
    'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'
  >(user.status)

  useEffect(() => {
    setStatus(user.status)
  }, [user])

  const handleUpdateStatus = async (
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL',
  ) => {
    try {
      const response = await updateStatus(status, user.id)
      setStatus(response.data.status)

      await baseApi.post('/candidates/send-email', {
        userId: user.id,
        status: response.data.status,
        vacancyId,
      })

      toast({
        title: 'Статус кандидата обновлен',
        description: 'Отправлено письмо на почту',
      })
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'О нет',
        description: 'Что то пошло не так',
      })
    }
  }

  return (
    <div className="border rounded-lg animate-fade w-full p-4 h-fit">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {user.firstName} {user.lastName} {user.patronymic}
          </h4>

          <div className="flex flex-wrap gap-4 items-center">
            <Select
              value={status}
              onValueChange={(value: 'PENDING' | 'APPROVED' | 'REJECTED') =>
                handleUpdateStatus(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">
                  <Badge variant="waiting">В ожидании</Badge>
                </SelectItem>
                <SelectItem value="APPROVED">
                  <Badge variant="success">Одобрен</Badge>
                </SelectItem>
                <SelectItem value="REJECTED">
                  <Badge variant="destructive">Отказ</Badge>
                </SelectItem>
              </SelectContent>
            </Select>

            <Link target="_blank" to={user.gitHubLink}>
              <Github className="cursor-pointer" />
            </Link>
          </div>
        </div>

        <div className="max-w-3xl">
          <div className="flex items-center flex-wrap gap-2">
            {user.skills.map((skill) => (
              <Badge key={skill.value}>{skill.label}</Badge>
            ))}
          </div>

          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pt-4">
            О кандидате
          </h4>
          <ReactMarkdown>{user.about}</ReactMarkdown>
        </div>

        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pt-4">
          Опыт работы
        </h4>

        <div className="max-w-4xl">
          <JobExprecienceStory jobs={user.jobExperience} />
        </div>
      </div>
    </div>
  )
}
