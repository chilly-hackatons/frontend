import { useSignUpContext } from '@/pages/SignUp/SignUpContext'
import { CandidateSecondForm } from '@/widgets/RegisterForm/components/CandidateSecondForm'
import { FinalForm } from '@/widgets/RegisterForm/components/FinalForm'
import { FirstForm } from '@/widgets/RegisterForm/components/FirstForm'
import { RecruiterSecondForm } from '@/widgets/RegisterForm/components/RecruiterSecondForm'
import { useStepper } from '@/widgets/RegisterForm/context/RegisterFormStepperContext'

export const Steps = () => {
  const { user } = useSignUpContext()
  const { activeStep } = useStepper()

  const isCandidate = user.user_type === 'APPLICANT'

  return (
    <div>
      {activeStep === 0 && (
        <div>
          <FirstForm />
        </div>
      )}

      {activeStep === 1 && isCandidate && (
        <div>
          <CandidateSecondForm />
        </div>
      )}

      {activeStep === 1 && !isCandidate && (
        <div>
          <RecruiterSecondForm />
        </div>
      )}

      {activeStep === 2 && (
        <div>
          <FinalForm />
        </div>
      )}
    </div>
  )
}
