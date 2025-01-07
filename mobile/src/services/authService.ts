import { AppError } from '@utils/AppError'
import { SessionRequestDTO, SessionResponseDTO } from '../dtos/SessionDTO'
import { api } from './api'

async function signIn(data: SessionRequestDTO): Promise<SessionResponseDTO> {
  try {
    const { data: response } = await api.post('/sessions', data)

    return response
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível efetivar o login. Tente novamente mais tarde.'
    )
  }
}

export const AuthService = {
  signIn
}
