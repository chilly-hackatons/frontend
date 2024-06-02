import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { UserDto } from '@/entities/auth/dto'
import { Button } from '@/shared/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'

interface ProfileFormProps {
  user: UserDto
}

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'Имя должно содержать не менее 2 символов.',
    })
    .max(50),
  lastName: z.string().min(2, {
    message: 'Фамилия должно содержать не менее 2 символов',
  }),
  patronymic: z.string().min(2, {
    message: 'Отчество должно содержать не менее 2 символов',
  }),
  email: z.string().email({
    message: 'Неверный адрес электронной почты.',
  }),
  companyName: z.string().min(2, {
    message: 'Название компании должно содержать не менее 2 символов',
  }),
  about: z
    .string({
      required_error: 'Обязательное поле',
    })
    .min(50, {
      message: 'Должно быть не менее 50 символов',
    })
    .max(450),
})

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const isRecruiter = user.type === 'RECRUITER'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="py-4 border-t">
      <div className="flex justify-between items-center">
        <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-wide first:mt-0 ">
          Персональная информация
        </h2>

        <Button onClick={form.handleSubmit(onSubmit)}>
          <Save className="mr-2 h-4 w-4" />
          Сохранить
        </Button>
      </div>

      <div className="flex gap-4">
        <Form {...form}>
          <form className="flex-[0_1_70%] grid grid-cols-profile gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input defaultValue={user.firstName} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input defaultValue={user.lastName} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patronymic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Отчество</FormLabel>
                  <FormControl>
                    <Input defaultValue={user.patronymic} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input defaultValue={user.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isRecruiter && (
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название компании</FormLabel>
                    <FormControl>
                      <Input defaultValue={user.companyName} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>О себе</FormLabel>
                  <FormControl>
                    <Textarea rows={6} defaultValue={user.about} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div />
      </div>
    </div>
  )
}
