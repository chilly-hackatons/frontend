import { ReactNode } from 'react'

import { StepperProvider } from '@/widgets/RegisterForm/context/RegisterFormStepperContext'

interface RegistrationFormProps {
  children: ReactNode
}

export const RegistrationForm = ({ children }: RegistrationFormProps) => {
  return (
    <StepperProvider value={{ activeStep: 0, initialStep: 0 }}>
      <div className="p-4 w-[400px]">{children}</div>
    </StepperProvider>
  )
}
