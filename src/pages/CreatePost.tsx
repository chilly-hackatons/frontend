import 'easymde/dist/easymde.min.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SimpleMdeReact from 'react-simplemde-editor'
import { z } from 'zod'

import { useAuthUser } from '@/app/providers/auth'
import { OPTIONS } from '@/pages/SignUp/SignUp'
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

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
})

const formSchema = z.object({
  title: z
    .string({ required_error: 'Обязательное поле' })
    .min(2, { message: 'Минимум 2 символа' })
    .max(50, { message: 'Максимум 50 символов' }),
  content: z
    .string({ required_error: 'Обязательное поле' })
    .min(50, { message: 'Минимум 50 символов' })
    .max(1000, { message: 'Максимум 1000 символов' }),
  tags: z.array(optionSchema, { required_error: 'Обязательное поле' }).min(1, {
    message: 'Минимум 1 тег',
  }),
})
const CreatePost = () => {
  const [isLoading, setLoading] = useState(false)
  const { user } = useAuthUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // const tags = values.tags.map((tag) => tag.value)

    const data = {
      ...values,
      userId: user!.id,
    }
    setLoading(true)
    try {
      await baseApi.post('/post', data)
      toast({
        title: 'Пост создан',
        description: 'Спасибо за создание поста',
      })
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

  return (
    <div className="container p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заголовок поста</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Как взрастить картошку на марсе?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заголовок поста</FormLabel>
                <FormControl>
                  <SimpleMdeReact {...field} />
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
                    defaultOptions={OPTIONS}
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

export default CreatePost
