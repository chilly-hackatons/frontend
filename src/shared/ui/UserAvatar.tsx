import { UserRound } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/shared/ui/avatar'

export const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarFallback>
        <UserRound />
      </AvatarFallback>
    </Avatar>
  )
}
