import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { RoutePath } from '@/app/providers/router/config'
import { useSignIn } from '@/shared/hooks/useSignIn'
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

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Обязательное поле',
    })
    .email({
      message: 'Неверный адрес электронной почты.',
    }),
  password: z.string({ required_error: 'Обязательное поле' }).min(6, {
    message: 'Пароль должен содержать не менее 6 символов.',
  }),
})

const defaultValues = {
  email: '',
  password: '',
}

export const LoginForm = () => {
  const { isLoading, signInUser } = useSignIn()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    signInUser(values)
  }

  return (
    <Card bordered className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Вход</CardTitle>
        <CardDescription>
          Введите свой адрес электронной почты ниже, чтобы войти в свою учетную
          запись
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid gap-4">
              <div className="grid gap-2">
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

              <div className="grid gap-2">
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
              <Button loading={isLoading} type="submit" className="w-full">
                Войти
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              У вас нет учетной записи?
              <br />
              <Link to={RoutePath.signUp} className="underline">
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
