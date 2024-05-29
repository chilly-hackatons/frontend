import { Link } from 'react-router-dom'

import { RoutePath } from '@/app/providers/router/config'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'

export const FirstForm = () => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Регистрация</CardTitle>
        <CardDescription>
          Введите свои данные для начала создания учетной записи
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Имя</Label>
              <Input id="first-name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="last-name">Фамилия</Label>
              <Input id="last-name" required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="patronymic">Отчество</Label>
            <Input id="patronymic" type="text" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Почта</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@mail.ru"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="repeat-password">Повторите пароль</Label>
            <Input id="repeat-password" type="password" />
          </div>

          <RadioGroup
            className="flex gap-2 justify-between p-2"
            defaultValue="option-one"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label className="cursor-pointer" htmlFor="option-one">
                Соискатель
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label className="cursor-pointer" htmlFor="option-two">
                Рекрутер
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-4 text-center text-sm">
          Уже есть аккаунт?{' '}
          <Link to={RoutePath.signIn} className="underline">
            Войти
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
