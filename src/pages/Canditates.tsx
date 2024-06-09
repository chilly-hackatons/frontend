import { ApplicantCard } from '@/shared/ui/applicant-card'
import { Input } from '@/shared/ui/input'

const Canditates = () => {
  return (
    <div className="container p-4 flex animate-fade">
      <div className="flex-[0_1_80%] grid grid-cols-homePosts gap-4">
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
      </div>
      <div className="grid grid-cols-homePosts">
        <div className="px-4">
          <Input />
        </div>
      </div>
    </div>
  )
}

export default Canditates
