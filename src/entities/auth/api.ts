import { AxiosResponse } from 'axios'

import {
  RefereshTokenDto,
  UserSignInDto,
  UserSignInDtoResponse,
  UserSignUpContext,
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
  body: UserSignUpDto | UserSignUpContext,
): Promise<AxiosResponse<UserSignUpDtoResponse>> => {
  return baseApi.post<UserSignUpDtoResponse>('/auth/sign-up', body)
}

export const refreshToken = async (): Promise<
  AxiosResponse<RefereshTokenDto>
> => {
  return baseApi.get<RefereshTokenDto>('/auth/refresh')
}
