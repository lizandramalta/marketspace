import { AuthStorage } from '@storage/authStorage'
import { AppError } from '@utils/AppError'
import axios, { AxiosError, AxiosInstance } from 'axios'

type SignOut = () => void

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => void
  reset: () => void
}

const GERERIC_ERROR =
  'Ocorreu um problema inesperado. Tente novamente mais tarde.'
const BASE_URL = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_API_PORT}`

const refreshTokenApiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000
})

async function fetchNewToken(refresh_token: string) {
  try {
    const { data } = await refreshTokenApiInstance.post(
      '/sessions/refresh-token',
      { refresh_token }
    )

    await AuthStorage.saveToken(data.token)
    return data.token
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.data) {
      throw new AppError(error.response.data.message)
    }
    throw new AppError(GERERIC_ERROR)
  }
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 6000
}) as APIInstanceProps

let failedQueue: PromiseType[] = []
let isRefreshing = false
let interceptTokenManager: number | null = null

api.reset = () => {
  if (interceptTokenManager) {
    api.interceptors.response.eject(interceptTokenManager)
    interceptTokenManager = null
  }
}

api.registerInterceptTokenManager = (signOut) => {
  if (interceptTokenManager !== null) {
    return
  }

  api.interceptors.response.use(
    (response) => response,
    async (responseError) => {
      if (responseError?.response?.status === 401) {
        if (
          responseError.response.data?.message === 'token.expired' ||
          responseError.response.data?.message === 'token.invalid'
        ) {
          const refresh_token = await AuthStorage.getRefreshToken()

          if (!refresh_token) {
            signOut()
            return Promise.reject(new AppError(GERERIC_ERROR))
          }

          const originalRequestConfig = responseError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token) => {
                  ;(originalRequestConfig.headers = {
                    ...originalRequestConfig.headers,
                    Authorization: `Bearer ${token}`
                  }),
                    resolve(api(originalRequestConfig))
                },
                onFailure: (error) => {
                  reject(error)
                }
              })
            })
          }

          isRefreshing = true

          return new Promise(async (resolve, reject) => {
            try {
              const newToken = await fetchNewToken(refresh_token)

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                )
              }

              originalRequestConfig.headers = {
                ...originalRequestConfig.headers,
                Authorization: `Bearer ${newToken}`
              }

              api.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${newToken}`

              failedQueue.forEach((request) => {
                request.onSuccess(newToken)
              })

              resolve(api(originalRequestConfig))
            } catch (error) {
              if (!(error instanceof AppError)) {
                failedQueue.forEach((request) => {
                  request.onFailure(error as AxiosError)
                })
              }
              signOut()
              reject(error)
            } finally {
              isRefreshing = false
              failedQueue.pop()
            }
          })
        }
        signOut()
      }

      if (responseError instanceof AppError) {
        return Promise.reject(responseError)
      }

      if (responseError.response && responseError.response.data) {
        return Promise.reject(new AppError(responseError.response.data.message))
      }
      return Promise.reject(
        new AppError('Erro no servidor. Tente novamente mais tarde.')
      )
    }
  )
}

export { api }
