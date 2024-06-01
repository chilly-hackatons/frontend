import { useAuthUser } from '@/app/providers/auth'
import { userType } from '@/shared/lib/user-type'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { UserAvatar } from '@/shared/ui/UserAvatar'

export const HeaderProfileInfo = () => {
  const { logout, user } = useAuthUser()

  return (
    <div className="flex gap-4">
      <div className="flex flex-col">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {user!.firstName}
        </p>
        <p className="text-sm text-muted-foreground">{userType(user!.type)}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Профиль</DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Выйти</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
