import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const customError = {
      message: error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data
        ? String((error.response.data as { message: string }).message)
        : error.message || 'Ocorreu um erro inesperado',
      status: error.response?.status,
      data: error.response?.data,
    }

    if (error.response?.status === 401) {
      // Eventual redirecionamento ou refresh token
      console.warn('[API] Sessão expirada ou não autorizada.')
    }

    return Promise.reject(customError)
  }
)
