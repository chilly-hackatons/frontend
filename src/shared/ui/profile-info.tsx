import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuthUser } from '@/app/providers/auth'
import { RoutePath } from '@/app/providers/router/config'
import { userType } from '@/shared/lib/user-type'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { UserAvatar } from '@/shared/ui/UserAvatar'

export const HeaderProfileInfo = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { logout, user } = useAuthUser()

  const isRecruiter = user?.type === 'RECRUITER'

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {user!.firstName}
        </p>
        <p className="text-sm text-muted-foreground">{userType(user!.type)}</p>
      </div>
      <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
        <DropdownMenuTrigger>
          <UserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={closeMenu}>
            <Link to={RoutePath.createPost}>Создать пост</Link>
          </DropdownMenuItem>

          {isRecruiter && (
            <DropdownMenuItem onClick={closeMenu}>
              <Link to={RoutePath.createVacancy}>Создать вакансию</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={closeMenu}>
            <Link to={RoutePath.profile}>Профиль</Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={logout}>Выйти</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
