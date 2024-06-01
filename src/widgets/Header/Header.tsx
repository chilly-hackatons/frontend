import { useAuthUser } from '@/app/providers/auth'
import { LogoIcon } from '@/shared/icons/LogoIcon'
import { HeaderProfileInfo } from '@/shared/ui/profile-info'

export const Header = () => {
  const { isAuthenticated } = useAuthUser()

  if (!isAuthenticated) {
    return null
  }

  return (
    <header className="container p-4 flex justify-between">
      <LogoIcon />

      <HeaderProfileInfo />
    </header>
  )
}
