import axios from 'axios'

import { RefereshTokenDto } from '@/entities/auth/dto'

export const urlApi = 'http://localhost:3000'

export const baseApi = axios.create({
  baseURL: urlApi,
  timeout: 1000,
  headers: {
    'Secret-Access-Token': import.meta.env.VITE_BASE_AUTH_KEY,
  },
  withCredentials: true,
})

baseApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      // Получение нового токена. Предполагается, что у вас есть функция для этого.
      const response = await baseApi.post<RefereshTokenDto>(
        `${urlApi}/auth/refresh`,
        {},
        {
          headers: {
            'Secret-Access-Token': import.meta.env.VITE_BASE_AUTH_KEY,
          },
          withCredentials: true,
        },
      )

      const newToken = response.data.accessToken

      // Сохранение нового токена в localStorage
      localStorage.setItem('token', newToken)

      // Установка нового токена в заголовок Authorization
      originalRequest.headers.Authorization = `Bearer ${newToken}`

      // Повторение оригинального запроса с новым токеном
      return baseApi(originalRequest)
    }

    return Promise.reject(error)
  },
)
