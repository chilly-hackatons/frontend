import { createContext, ReactNode, useContext, useState } from 'react'

interface StepperContextProps {
  activeStep: number
  initialStep: number
}

export const StepperContext = createContext<
  | (StepperContextProps & {
      nextStep: () => void
      prevStep: () => void
      setStep: (step: number) => void
    })
  | undefined
>({
  activeStep: 0,
  initialStep: 0,
  nextStep: () => {},
  prevStep: () => {},
  setStep: () => {},
})

interface StepperProviderProps {
  value: StepperContextProps
  children: ReactNode
}

export const StepperProvider = ({ value, children }: StepperProviderProps) => {
  const [activeStep, setActiveStep] = useState(value.initialStep)

  const nextStep = () => {
    setActiveStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setActiveStep((prev) => prev - 1)
  }

  const setStep = (step: number) => {
    setActiveStep(step)
  }

  return (
    <StepperContext.Provider
      value={{
        ...value,
        activeStep,
        nextStep,
        prevStep,
        setStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}

export const useStepper = () => {
  const context = useContext(StepperContext)

  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider')
  }

  const { activeStep, nextStep, prevStep, setStep } = context

  return {
    activeStep,
    nextStep,
    prevStep,
    setStep,
  }
}
