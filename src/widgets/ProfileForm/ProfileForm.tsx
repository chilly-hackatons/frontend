/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuthUser } from '@/app/providers/auth'
import { UserDto } from '@/entities/auth/dto'
import { baseApi } from '@/shared/lib/baseApi'
import { calculateDateDifference } from '@/shared/lib/calculateDateDifference'
import { calculateTotalExperience } from '@/shared/lib/calculateTotalExperience'
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
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { MultipleSelector } from '@/shared/ui/multi-select'
import { Textarea } from '@/shared/ui/textarea'
import { toast } from '@/shared/ui/use-toast'
import { SKILLS } from '@/shared/utils/constants'
import { JobExpirience } from '@/widgets/ProfileForm/JobExpirience'

interface ProfileFormProps {
  user: UserDto
  formSchema: z.Schema
}

export const ProfileForm = ({ user, formSchema }: ProfileFormProps) => {
  const { handleUser } = useAuthUser()
  const [isLoadingProfile, setLoadingProfile] = useState(false)
  const [isLoadingDeleteJob, setLoadingDeleteJob] = useState(false)
  const isRecruiter = user.type === 'RECRUITER'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let userProfile
    console.log(values)
    if (values.skills) {
      userProfile = {
        ...values,
        userType: user.type,
        skills: values.skills.map(
          (tag: { value: string; label: string }) => tag.label,
        ),
      }
    } else {
      userProfile = { ...values, userType: user.type }
    }

    setLoadingProfile(true)
    try {
      const response = await baseApi.patch(`/profile/${user.id}`, userProfile)
      handleUser(response.data)
      toast({
        title: 'Профиль обновлен',
        description: 'Ваши данные были успешно обновлены',
      })
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'О нет',
        description: 'Что то пошло не так',
      })
    } finally {
      setLoadingProfile(false)
    }
  }

  const removeJobExperience = async (jobTitle: string) => {
    const data = { companyTitle: jobTitle }
    setLoadingDeleteJob(true)
    try {
      const response = await baseApi.patch(
        `/profile/job-delete/${user.id}`,
        data,
      )
      console.log(response.data)
      handleUser(response.data)
      toast({
        title: 'Место работы удалено',
        description: 'Ваши данные о работе были успешно удалены',
      })
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'О нет',
        description: 'Что то пошло не так',
      })
    } finally {
      setLoadingDeleteJob(false)
    }
  }

  return (
    <div className="py-4 border-t">
      <div className="flex justify-between items-center max-w-[70%] mb-4">
        <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-wide first:mt-0 ">
          Персональная информация
        </h2>

        <Button
          loading={isLoadingProfile}
          onClick={form.handleSubmit(onSubmit)}
        >
          <Save className="mr-2 h-4 w-4" />
          Сохранить
        </Button>
      </div>

      <div className="flex gap-4">
        <Form {...form}>
          <form className="flex-[0_1_70%] grid grid-cols-profile gap-4 grid-rows-[100px_100px_100px]">
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
                        defaultOptions={SKILLS}
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
          <div className="flex items-center justify-between pb-2">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-wide first:mt-0 ">
              Опыт работы
            </h2>
            <p className="leading-7">
              {calculateTotalExperience(user.jobExperience)}
            </p>
          </div>

          <JobExpirience user={user} />

          {user.jobExperience.map((job) => (
            <Card
              key={job.companyTitle}
              className="max-w-[405px] transition-all hover:bg-accent cursor-pointer"
              bordered
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {job.companyTitle}
                  <Button
                    onClick={() => removeJobExperience(job.companyTitle)}
                    size="icon"
                    variant="ghost"
                    className="ml-2 transition-all hover:bg-slate-200 cursor-pointer"
                  >
                    {isLoadingDeleteJob ? <LoadingSpinner /> : <Trash2 />}
                  </Button>
                </CardTitle>
                <CardDescription>
                  {calculateDateDifference(job.date.from, job.date.to)}
                </CardDescription>
              </CardHeader>
              <CardContent className="line-clamp-1">
                {job.aboutWork.slice(0, 40) + '...'}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
