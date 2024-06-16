import { Github } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'

import { useFetchCandidate } from '@/shared/hooks/useFetchCandidate'
import { calculateTotalExperience } from '@/shared/lib/calculateTotalExperience'
import { Badge } from '@/shared/ui/badge'
import { JobExprecienceStory } from '@/shared/ui/job-experience-story'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'

const CandidateProfile = () => {
  const { id } = useParams()

  const { candidate, isLoading } = useFetchCandidate(id)

  if (isLoading)
    return (
      <div className="container p-4 animate-fade">
        <LoadingSpinner />
      </div>
    )

  if (!candidate) return <div className="container p-4">Кандидат не найден</div>

  return (
    <div className="container p-4 animate-fade flex flex-col gap-6">
      <div className="flex justify-between flex-wrap gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {candidate.firstName} {candidate.lastName} {candidate.patronymic}
        </h3>

        <div>{calculateTotalExperience(candidate.jobExperience)}</div>
      </div>

      <div className="prose">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Обо мне:
        </h4>
        <ReactMarkdown>{candidate.about}</ReactMarkdown>
      </div>

      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">
          Социальные сети:
        </h4>
        <Link target="_blank" to={candidate.gitHubLink}>
          <Github />
        </Link>
      </div>

      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Навыки:
        </h4>
        <div className="flex flex-wrap gap-1 mt-2">
          {candidate.skills.map((skill) => (
            <Badge key={skill.value}>{skill.label}</Badge>
          ))}
        </div>
      </div>

      {candidate.jobExperience.length > 0 && (
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">
            Опыт работы:
          </h4>
          <JobExprecienceStory jobs={candidate.jobExperience} />
        </div>
      )}
    </div>
  )
}

export default CandidateProfile
