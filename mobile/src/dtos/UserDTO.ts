export type UserDTO = {
  id: string
  avatar: string
  name: string
  email: string
  tel: string
}

export type UserCreateRequestDTO = {
  avatar: any
  name: string
  email: string
  tel: string
  password: string
}
