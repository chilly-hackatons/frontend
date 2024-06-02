import { useAuthUser } from '@/app/providers/auth'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { ProfileForm } from '@/widgets/ProfileForm/ProfileForm'

const Profile = () => {
  const { user, isLoading } = useAuthUser()

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

      <ProfileForm user={user} />
    </div>
  )
}

export default Profile
