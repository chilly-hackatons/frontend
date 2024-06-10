import 'easymde/dist/easymde.min.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import SimpleMdeReact from 'react-simplemde-editor'
import { z } from 'zod'

import { useAuthUser } from '@/app/providers/auth'
import { RoutePath } from '@/app/providers/router/config'
import { baseApi } from '@/shared/lib/baseApi'
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
import { MultipleSelector } from '@/shared/ui/multi-select'
import { toast } from '@/shared/ui/use-toast'
import { CREATE_VACANCY_OPTIONS } from '@/shared/utils/constants'

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
})

const formSchema = z.object({
  title: z
    .string({ required_error: 'Обязательное поле' })
    .min(2, { message: 'Минимум 2 символа' })
    .max(150, { message: 'Максимум 150 символов' }),
  description: z
    .string({ required_error: 'Обязательное поле' })
    .min(50, { message: 'Минимум 50 символов' })
    .max(10000, { message: 'Максимум 10000 символов' }),
  tags: z.array(optionSchema, { required_error: 'Обязательное поле' }).min(1, {
    message: 'Минимум 1 тег',
  }),
})
const CreateVacancy = () => {
  const [isLoading, setLoading] = useState(false)
  const { user } = useAuthUser()

  const navigate = useNavigate()

  const isCandidate = user.type === 'APPLICANT'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const tags = values.tags.map((tag) => tag.value)

    const data = {
      ...values,
      recruiterId: user.id,
      tags,
    }
    setLoading(true)
    try {
      const response = await baseApi.post('/vacancy', data)
      toast({
        title: 'Вакансия создана',
        description: 'Спасибо за создание вакансии',
      })

      navigate(`/vacancy/${response.data.id}`)
    } catch (error) {
      console.log(error)
      toast({
        title: 'Ошибка при создании поста',
        description: 'Что то пошло не так',
        variant: 'destructive',
      })
    } finally {
      form.reset()
      setLoading(false)
    }
  }

  if (isCandidate) {
    return <Navigate to={RoutePath.home} />
  }

  return (
    <div className="container p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заголовок вакансии</FormLabel>
                <FormControl>
                  <Input placeholder="Frontend разработчик" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание вакансии</FormLabel>
                <FormControl className="prose max-w-full">
                  <SimpleMdeReact
                    placeholder="Нам нужен крутой Frontend разработчик"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Теги</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    inputProps={{ id: 'multiple-selector' }}
                    defaultOptions={CREATE_VACANCY_OPTIONS}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button loading={isLoading} type="submit">
            Опубликовать
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateVacancy
