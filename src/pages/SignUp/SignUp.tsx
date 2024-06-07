import { SignUpProvider } from '@/pages/SignUp/SignUpContext'
import { Steps } from '@/widgets/RegisterForm/components/Steps'
import { RegistrationForm } from '@/widgets/RegisterForm/RegistrationForm'

const SignUp = () => {
  return (
    <div className="flex items-center justify-center">
      <SignUpProvider>
        <RegistrationForm>
          <Steps />
        </RegistrationForm>
      </SignUpProvider>
    </div>
  )
}

export default SignUp
