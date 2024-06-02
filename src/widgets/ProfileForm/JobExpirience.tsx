import { zodResolver } from '@hookform/resolvers/zod'
import { BriefcaseBusiness } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
})

const defaultValues = {
  companyTtitle: '',
  aboutWork: '',
}

export const JobExpirience = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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

            <DateRangePicker
              onUpdate={(values) => console.log(values)}
              align="center"
              locale="ru-RU"
              showCompare={false}
            />

            <DialogFooter>
              <Button type="submit" className="w-full mt-4">
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
