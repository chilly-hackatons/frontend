import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import { useAuthUser } from '@/app/providers/auth'
import { Comment } from '@/shared/hooks/useFetchPost'
import { baseApi } from '@/shared/lib/baseApi'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Textarea } from '@/shared/ui/textarea'
import { toast } from '@/shared/ui/use-toast'

interface CreateCommentProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  addComments: (comment: Comment) => void
}

const formSchema = z.object({
  content: z
    .string({ required_error: 'Обязательное поле' })
    .min(20, { message: 'Минимальная длина 20' })
    .max(500, { message: 'Максимальная длина 250' }),
})

export const CreateComment = ({
  open,
  setOpen,
  addComments,
}: CreateCommentProps) => {
  const [isLoading, setLoading] = useState(false)

  const { id } = useParams()
  const { user } = useAuthUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    const data = {
      ...values,
      postId: Number(id),
      userId: user!.id,
    }

    setLoading(true)
    try {
      const response = await baseApi.post('/comments', data)
      addComments(response.data)
      toast({
        title: 'Комментарий создан',
        description: 'Спасибо за комментарий',
      })

      setOpen(false)
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'О нет',
        description: 'Что то пошло не так',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание комментария</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isLoading} type="submit">
              Создать
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
