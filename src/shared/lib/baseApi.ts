import axios from 'axios'

export const urlApi = 'http://localhost:3000'

export const baseApi = axios.create({
  baseURL: urlApi,
  timeout: 1000,
  headers: { 'Secret-Access-Token': import.meta.env.VITE_BASE_AUTH_KEY },
  withCredentials: true,
})

baseApi.interceptors.response.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})
