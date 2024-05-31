export type UserType = 'APPLICANT' | 'RECRUITER'

export interface UserDto {
  id: number
  email: string
  firstName: string
  lastName: string
  patronymic: string
  about: string
  avatar: string | null
  jobExperience: []
  type: UserType
  createdAt: string
}

export interface RefereshTokenDto {
  accessToken: string
  user: UserDto
}

export interface UserSignInDtoResponse {
  accessToken: string
  user: UserDto
}

export interface UserSignInDto {
  email: string
  password: string
}

export interface UserSignUpDtoResponse {
  accessToken: string
  user: UserDto
}

export interface UserSignUpDto {
  first_name: string
  last_name: string
  patronymic: string
  email: string
  about: string
  password: string
  github?: string
  technologies?: string[]
  company_name?: string
  user_type: UserType
}
