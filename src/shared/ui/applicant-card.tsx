import { calculateTotalExperience } from '@/shared/lib/calculateTotalExperience'
import { Badge } from '@/shared/ui/badge'

interface ApplicantCardProps {
  id: number
  avatar: string | null
  about: string
  createdAt: string
  email: string
  firstName: string
  gitHubLink: string
  jobExperience: []
  lastName: string
  patronymic: string
  skills: Array<{ label: string; value: string }>
}

export const ApplicantCard = ({ ...props }: ApplicantCardProps) => {
  return (
    <button className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent justify-around animate-fade">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{props.firstName}</div>
          </div>
          <div className="ml-auto">
            <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
              {calculateTotalExperience(props.jobExperience)}
            </h4>
          </div>
        </div>
      </div>
      <div className="line-clamp-3 text-sm">{props.about.slice(0, 300)}</div>
      <div className="flex items-center gap-2 flex-wrap">
        {props.skills.map((skill) => (
          <Badge key={skill.value}>{skill.label}</Badge>
        ))}
      </div>
    </button>
  )
}
