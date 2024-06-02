import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuthUser } from '@/app/providers/auth'
import { UserDto } from '@/entities/auth/dto'
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
import { Textarea } from '@/shared/ui/textarea'
import { toast } from '@/shared/ui/use-toast'
import { JobExpirience } from '@/widgets/ProfileForm/JobExpirience'

interface ProfileFormProps {
  user: UserDto
  formSchema: z.Schema
}

export const ProfileForm = ({ user, formSchema }: ProfileFormProps) => {
  const { handleUser } = useAuthUser()
  const [isLoading, setLoading] = useState(false)
  const isRecruiter = user.type === 'RECRUITER'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  })

  const isTouchedForm = Object.values(form.formState.touchedFields).length === 0

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userProfile = { ...values, userType: user.type }
    setLoading(true)
    try {
      const response = await baseApi.patch(`/profile/${user.id}`, userProfile)
      handleUser(response.data)
      toast({
        title: 'Профиль обновлен',
        description: 'Ваши данные были успешно обновлены',
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-4 border-t">
      <div className="flex justify-between items-center max-w-[70%] mb-4">
        <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-wide first:mt-0 ">
          Персональная информация
        </h2>

        <Button
          disabled={isTouchedForm}
          loading={isLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
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

            {!isRecruiter && (
              <FormField
                control={form.control}
                name="gitHubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input defaultValue={user.gitHubLink} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!isRecruiter && (
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Технологии</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        inputProps={{
                          id: 'multiple-selector',
                        }}
                        defaultOptions={OPTIONS}
                        isFullWidth
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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

        <div className="flex flex-col gap-4 flex-[0_1_30%]">
          <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-wide first:mt-0 ">
            Опыт работы
          </h2>
          <JobExpirience />
        </div>
      </div>
    </div>
  )
}
