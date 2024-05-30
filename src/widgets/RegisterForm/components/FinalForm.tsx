import { useState } from 'react'

import { useSignUp } from '@/pages/SignUp/SignUpContext'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Checkbox } from '@/shared/ui/checkbox'
import { useStepper } from '@/widgets/RegisterForm/context/RegisterFormStepperContext'

export const FinalForm = () => {
  const [isAgree, setAgree] = useState(false)

  const { prevStep } = useStepper()
  const { user } = useSignUp()

  return (
    <div className="h-screen flex flex-col justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            🎉 Вы в шаге от регистрации 🎉
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox onClick={() => setAgree(!isAgree)} id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Я соглашаюсь с Условиями использования и Политикой
              конфиденциальности
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-between p-4 w-full">
        <Button onClick={prevStep}>Назад</Button>
        <Button disabled={!isAgree} onClick={() => console.log(user)}>
          Зарегистрироваться
        </Button>
      </div>
    </div>
  )
}
