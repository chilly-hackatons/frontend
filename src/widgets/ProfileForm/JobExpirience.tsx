import { zodResolver } from '@hookform/resolvers/zod'
import { BriefcaseBusiness } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuthUser } from '@/app/providers/auth'
import { UserDto } from '@/entities/auth/dto'
import { baseApi } from '@/shared/lib/baseApi'
import { Button } from '@/shared/ui/button'
import { DateRangePicker } from '@/shared/ui/date-range-picker'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
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

interface JobExperienceProps {
  user: UserDto
}

const dateRange = z.object({
  from: z.date(),
  to: z.date(),
})

const formSchema = z.object({
  companyTitle: z
    .string({
      required_error: 'Обязательное поле',
    })
    .min(2, {
      message: 'Название должно содержать не менее 2 символов',
    })
    .max(50, {
      message: 'Название должно содержать не более 50 символов',
    }),
  aboutWork: z
    .string({
      required_error: 'Обязательное поле',
    })
    .min(50, {
      message: 'Должно быть не менее 50 символов',
    })
    .max(400, {
      message: 'Должно быть не более 400 символов',
    }),
  date: dateRange,
})

const defaultValues = {
  companyTitle: '',
  aboutWork: '',
  date: {
    from: new Date(new Date().setDate(new Date().getDate() - 2)),
    to: new Date(new Date().setDate(new Date().getDate())),
  },
}

export const JobExpirience = ({ user }: JobExperienceProps) => {
  const [isLoading, setLoading] = useState(false)
  const { handleUser } = useAuthUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const data = {
      ...values,
      date: {
        from: values.date.from.toISOString(),
        to: values.date.to.toISOString(),
      },
    }
    setLoading(true)

    try {
      const response = await baseApi.patch(`/job/${user.id}`, data)
      handleUser(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)

      form.reset()
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BriefcaseBusiness className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-base text-muted-foreground group-hover:text-primary">
            Добавить место работы
          </p>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить место работы</DialogTitle>
          <DialogDescription>
            Заполните информацию по опыту работы
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="companyTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название компании</FormLabel>
                  <FormControl>
                    <Input placeholder="Yandex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aboutWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание работы</FormLabel>
                  <FormControl>
                    <Textarea rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Период работы</FormLabel>
                  <FormControl>
                    <DateRangePicker
                      onUpdate={(values) => field.onChange(values.range)}
                      align="center"
                      locale="ru-RU"
                      showCompare={false}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button loading={isLoading} type="submit" className="w-full mt-4">
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
