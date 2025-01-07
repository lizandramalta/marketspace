import { AppError } from '@utils/AppError'
import { UserCreateRequestDTO } from '../dtos/UserDTO'
import { api } from './api'

async function createUser(data: UserCreateRequestDTO) {
  try {
    const formData = new FormData()
    formData.append('avatar', data.avatar)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('tel', data.tel)
    formData.append('password', data.password)

    await api.post('users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível criar o usuário. Tente novamente mais tarde.'
    )
  }
}

export const UserService = {
  createUser
}
