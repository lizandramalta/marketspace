import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'
import { REFRESH_TOKEN_STORAGE, TOKEN_STORAGE } from './storage.config'

async function saveToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE, token)
  } catch (error) {
    console.log(error)
    throw new AppError('Ocorreu um erro. Tente novamente mais tarde.')
  }
}

async function getToken(): Promise<string> {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE)

    return token ?? ''
  } catch (error) {
    console.log(error)
    throw new AppError('Ocorreu um erro. Tente novamente mais tarde.')
  }
}

async function removeToken() {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  } catch (error) {
    console.log(error)
  }
}

async function saveRefreshToken(token: string) {
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE, token)
  } catch (error) {
    console.log(error)
    throw new AppError('Ocorreu um erro. Tente novamente mais tarde.')
  }
}

async function getRefreshToken(): Promise<string> {
  try {
    const token = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE)

    return token ?? ''
  } catch (error) {
    console.log(error)
    throw new AppError('Ocorreu um erro. Tente novamente mais tarde.')
  }
}

async function removeRefreshToken() {
  try {
    await AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE)
  } catch (error) {
    console.log(error)
  }
}

export const AuthStorage = Object.freeze({
  saveToken,
  getToken,
  removeToken,
  saveRefreshToken,
  getRefreshToken,
  removeRefreshToken
})
