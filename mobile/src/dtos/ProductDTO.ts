import { UserDTO } from './UserDTO'

export type PaymentMethods = 'pix' | 'card' | 'boleto' | 'cash' | 'deposit'

type ProductImage = {
  id: string
  path: string
}

export type ProductDTO = {
  accept_trade: boolean
  id: string
  is_new: boolean
  is_active: boolean
  name: string
  payment_methods: {
    key: PaymentMethods
    name: string
  }[]
  price: number
  product_images: ProductImage[]
  user: Pick<UserDTO, 'avatar'>
}

export type ProductQueryParamsDTO = {
  is_new?: boolean
  accept_trade?: boolean
  payment_methods?: PaymentMethods
  query?: string
}
