import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { RoutePath } from '@/app/providers/router/config'
import { useSignUpContext } from '@/pages/SignUp/SignUpContext'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { useStepper } from '@/widgets/RegisterForm/context/RegisterFormStepperContext'

const defaultValues = {
  first_name: '',
  last_name: '',
  patronymic: '',
  email: '',
  password: '',
  repeat_password: '',
}

const formSchema = z
  .object({
    first_name: z
      .string()
      .min(2, {
        message: 'Имя должно содержать не менее 2 символов.',
      })
      .max(50),
    last_name: z.string().min(2, {
      message: 'Фамилия должно содержать не менее 2 символов',
    }),
    patronymic: z.string().min(2, {
      message: 'Отчество должно содержать не менее 2 символов',
    }),
    email: z.string().email({
      message: 'Неверный адрес электронной почты.',
    }),
    password: z.string().min(6, {
      message: 'Пароль должен содержать не менее 6 символов.',
    }),
    repeat_password: z.string().min(6, {
      message: 'Пароль должен содержать не менее 6 символов.',
    }),
    user_type: z.enum(['APPLICANT', 'RECRUITER'], {
      required_error: 'Обязательное поле',
    }),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: ' Пароли не совпадают',
    path: ['repeat_password'],
  })

export const FirstForm = () => {
  const { nextStep } = useStepper()
  const { updateUser, user } = useSignUpContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    defaultValues: user ? user : defaultValues,
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    updateUser(values)
    nextStep()
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Фамилия</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="patronymic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Отчество</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Почта</FormLabel>
                      <FormControl>
                        <Input placeholder="user@mail.ru" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="repeat_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Повторите пароль</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="user_type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Кто ты воин?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex justify-between space-y-1 flex-wrap gap-4 "
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="APPLICANT" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Соискатель 👨🏼‍💻
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="RECRUITER" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Рекрутер 🕵🏻‍♀️
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 justify-between p-4 w-full">
                <Button disabled>Назад</Button>
                <Button type="submit">Далее</Button>
              </div>
            </form>
          </Form>
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
