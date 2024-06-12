import { UserCandidate } from '@/entities/auth/dto'
import { Badge } from '@/shared/ui/badge'

export const FeedbackStatus = ({ status }: Pick<UserCandidate, 'status'>) => {
  let content
  switch (status) {
    case 'APPROVED':
      content = <Badge variant="success">Одобрен</Badge>
      break
    case 'PENDING':
      content = <Badge variant="waiting">В ожидании</Badge>
      break
    case 'REJECTED':
      content = <Badge variant="destructive">Отклонен</Badge>
      break
    default:
      content = null
      break
  }
  return <>{content}</>
}
