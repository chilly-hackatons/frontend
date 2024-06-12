import { Github } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { UserCandidate } from '@/entities/auth/dto'
import { Badge } from '@/shared/ui/badge'
import { JobExprecienceStory } from '@/shared/ui/job-experience-story'

interface CandidatesFeedbackProps {
  user: UserCandidate | null
}

export const CandidatesFeedbackInfo = ({ user }: CandidatesFeedbackProps) => {
  if (!user) return null

  return (
    <div className="border rounded-lg animate-fade w-full p-4 h-fit">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {user.firstName} {user.lastName} {user.patronymic}
          </h4>

          <div>
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
