import { format } from 'date-fns'
import { GitCommitHorizontal } from 'lucide-react'
import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'

import { JobExperience } from '@/entities/auth/dto'
import { calculateDateDifference } from '@/shared/lib/calculateDateDifference'
import { Separator } from '@/shared/ui/separator'

interface JobExperienceProps {
  jobs: JobExperience[]
}

export const JobExprecienceStory = ({ jobs }: JobExperienceProps) => {
  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <Fragment key={job.companyTitle}>
          <Separator />

          <div key={job.companyTitle} className="flex flex-col gap-4">
            <div className="flex gap-4 items-start ">
              <div className="flex flex-col  flex-[0_0_22%]">
                <div className="flex gap-2 items-center justify-between">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    {job.companyTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {calculateDateDifference(job.date.from, job.date.to)}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <small className="text-sm font-medium leading-none">
                    {format(job.date.from, 'dd.MM.yyyy')}
                  </small>
                  <GitCommitHorizontal />
                  <small className="text-sm font-medium leading-none">
                    {format(job.date.to, 'dd.MM.yyyy')}
                  </small>
                </div>
              </div>

              <div className="border-l-2 pl-3 min-h-12 w-[600px] break-words prose">
                <ReactMarkdown>{job.aboutWork}</ReactMarkdown>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
