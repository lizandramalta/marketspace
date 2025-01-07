import { UserDTO } from './UserDTO'

export type SessionRequestDTO = {
  email: string
  password: string
}

export type SessionResponseDTO = {
  token: string
  refresh_token: string
  user: UserDTO
}
