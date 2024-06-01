import { UserType } from '@/entities/auth/dto'

export const userType = (userTitle: UserType) => {
  switch (userTitle) {
    case 'APPLICANT':
      return 'Соискатель'
    case 'RECRUITER':
      return 'Рекрутер'
    default:
      return 'Кто ты воин?'
  }
}
