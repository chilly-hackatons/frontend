import { useSignUp } from '@/pages/SignUp/SignUpContext'
import { CandidateSecondForm } from '@/widgets/RegisterForm/components/CandidateSecondForm'
import { FinalForm } from '@/widgets/RegisterForm/components/FinalForm'
import { FirstForm } from '@/widgets/RegisterForm/components/FirstForm'
import { RecruiterSecondForm } from '@/widgets/RegisterForm/components/RecruiterSecondForm'
import { RegistrationForm } from '@/widgets/RegisterForm/RegistrationForm'

export const Steps = () => {
  const { user } = useSignUp()

  const isCandidate = user.user_type === 'candidate'

  return (
    <RegistrationForm>
      <div>
        <FirstForm />
      </div>

      {isCandidate && (
        <div>
          <CandidateSecondForm />
        </div>
      )}

      {!isCandidate && (
        <div>
          <RecruiterSecondForm />
        </div>
      )}

      <div>
        <FinalForm />
      </div>
    </RegistrationForm>
  )
}
