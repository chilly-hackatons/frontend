import { z } from 'zod'

import { useAuthUser } from '@/app/providers/auth'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { ProfileForm } from '@/widgets/ProfileForm/ProfileForm'

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
})

const formSchemaApplicant = z.object({
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
  skills: z.array(optionSchema, { required_error: 'Обязательное поле' }).min(1),
  gitHubLink: z.string({ required_error: 'Обязательное поле' }).url({
    message: 'Неверная ссылка',
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

const formSchemaRecruiter = z.object({
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

const Profile = () => {
  const { user, isLoading } = useAuthUser()

  const isRecruiter = user?.type === 'RECRUITER'

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return <>1</>
  }

  return (
    <div className="container p-4 animate-fade flex flex-col gap-16">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-wide first:mt-0">
            Ваш профиль
          </h2>
          <p className="text-sm text-muted-foreground">
            Вы можете изменить свой профиль
          </p>
        </div>
      </div>

      <ProfileForm
        formSchema={isRecruiter ? formSchemaRecruiter : formSchemaApplicant}
        user={user}
      />
    </div>
  )
}

export default Profile
