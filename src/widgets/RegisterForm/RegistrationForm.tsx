import { Children, isValidElement, ReactNode } from 'react'

import {
  StepperProvider,
  useStepper,
} from '@/widgets/RegisterForm/context/RegisterFormStepperContext'

interface RegistrationFormProps {
  children: ReactNode
}

export const RegistrationForm = ({ children }: RegistrationFormProps) => {
  const childArr = Children.toArray(children)

  const items = [] as React.ReactElement[]

  childArr.forEach((child, _index) => {
    if (!isValidElement(child)) {
      throw new Error('Stepper children must be valid React elements.')
    } else {
      items.push(child)
    }
  })

  return (
    <StepperProvider value={{ activeStep: 0, initialStep: 0, steps: items }}>
      <Content>{items}</Content>
    </StepperProvider>
  )
}

const Content = ({ children }: { children: ReactNode }) => {
  const { activeStep } = useStepper()

  const childArr = Children.toArray(children)

  if (activeStep > childArr.length) {
    return null
  }

  return (
    <div className="p-4 w-[400px]">
      {Children.map(childArr[activeStep], (node) => {
        if (!isValidElement(node)) {
          return null
        }
        return Children.map(node.props.children, (childNode) => childNode)
      })}
    </div>
  )
}
