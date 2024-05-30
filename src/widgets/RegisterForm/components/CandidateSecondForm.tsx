import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { OPTIONS } from '@/pages/SignUp/SignUp'
import { useSignUp } from '@/pages/SignUp/SignUpContext'
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
import { MultipleSelector } from '@/shared/ui/multi-select'
import { Textarea } from '@/shared/ui/textarea'
import { useStepper } from '@/widgets/RegisterForm/context/RegisterFormStepperContext'

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
})

const formSchema = z.object({
  about: z
    .string({
      required_error: 'Обязательное поле',
    })
    .min(50, {
      message: 'Должно быть не менее 50 символов',
    })
    .max(450),
  technologies: z
    .array(optionSchema, { required_error: 'Обязательное поле' })
    .min(1),
  github: z.string({ required_error: 'Обязательное поле' }).url({
    message: 'Неверная ссылка',
  }),
})

const defaultValues = {
  about: '',
  technologies: [],
  github: '',
}

export const CandidateSecondForm = () => {
  const { prevStep, nextStep } = useStepper()

  const { updateUser, user } = useSignUp()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    defaultValues: user ? user : defaultValues,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    updateUser(values)
    nextStep()
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Регистрация</CardTitle>
        <CardDescription>Заполните информацию о себе</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>О себе</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Что ты за смешарик ?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Технологии</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        inputProps={{ id: 'multiple-selector' }}
                        defaultOptions={OPTIONS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ссылка на github профиль</FormLabel>
                    <FormControl>
                      <Input placeholder="github.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 justify-between p-4 w-full">
              <Button onClick={prevStep}>Назад</Button>
              <Button type="submit">Далее</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
