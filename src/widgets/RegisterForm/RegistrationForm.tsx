import { Children, isValidElement, ReactNode } from 'react'

import { Button } from '@/shared/ui/button'
import {
  StepperProvider,
  useStepper,
} from '@/widgets/RegisterForm/context/RegisterFormContext'

interface RegistrationFormProps {
  children: ReactNode
}

export const RegistrationForm = ({ children }: RegistrationFormProps) => {
  const childArr = Children.toArray(children)

  const items = [] as React.ReactElement[]

  childArr.map((child, _index) => {
    if (!isValidElement(child)) {
      throw new Error('Stepper children must be valid React elements.')
    } else {
      items.push(child)
    }

    return child
  })

  return (
    <StepperProvider value={{ activeStep: 0, initialStep: 0, steps: items }}>
      <div>
        <Content>{items}</Content>
      </div>
    </StepperProvider>
  )
}

const Content = ({ children }: { children: ReactNode }) => {
  const { activeStep, nextStep, prevStep } = useStepper()

  const childArr = Children.toArray(children)

  if (activeStep > childArr.length) {
    return null
  }

  return (
    <div className="flex flex-col items-center">
      <div className="p-4">
        {Children.map(childArr[activeStep], (node) => {
          if (!isValidElement(node)) {
            return null
          }
          return Children.map(node.props.children, (childNode) => childNode)
        })}
      </div>

      <div className="flex gap-4 justify-between p-4 w-full">
        <Button disabled={activeStep === 0} onClick={prevStep}>
          Назад
        </Button>
        <Button onClick={nextStep}>Дальше</Button>
      </div>
    </div>
  )
}
