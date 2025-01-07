import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_STORAGE } from './storage.config'
import { UserDTO } from '../dtos/UserDTO'

async function save(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

async function get(): Promise<UserDTO> {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user: UserDTO = storage ? JSON.parse(storage) : {}
  return user
}

async function remove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}

export const UserStorage = Object.freeze({
  save,
  get,
  remove
})
