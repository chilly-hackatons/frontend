import { AxiosResponse } from 'axios'

import {
  UserSignInDto,
  UserSignInDtoResponse,
  UserSignUpDto,
  UserSignUpDtoResponse,
} from '@/entities/auth/dto'
import { baseApi } from '@/shared/lib/baseApi'

export const signIn = async (
  body: UserSignInDto,
): Promise<AxiosResponse<UserSignInDtoResponse>> => {
  return baseApi.post<UserSignInDtoResponse>('/auth/sign-in', body)
}

export const signUp = async (
  body: UserSignUpDto,
): Promise<AxiosResponse<UserSignUpDtoResponse>> => {
  return baseApi.post<UserSignUpDtoResponse>('/auth/sign-up', body)
}
