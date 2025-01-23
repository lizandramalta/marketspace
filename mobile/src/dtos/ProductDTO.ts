import { UserDTO } from './UserDTO'

export type PaymentMethods = 'pix' | 'card' | 'boleto' | 'cash' | 'deposit'

export type ProductImage = {
  id: string
  path: string
}

export type ProductDTO = {
  accept_trade: boolean
  id: string
  is_new: boolean
  is_active: boolean
  name: string
  payment_methods:
    | {
        key: PaymentMethods
        name: string
      }[]
  price: number
  product_images: ProductImage[]
  user: Omit<UserDTO, 'id' | 'email'>
  description?: string
}

export type ProductCreateDTO = Omit<
  ProductDTO,
  'id' | 'is_active' | 'user' | 'payment_methods' | 'product_images'
> & {
  payment_methods: string[]
  product_images: string[]
}

export type ProductQueryParamsDTO = {
  is_new?: boolean
  accept_trade?: boolean
  payment_methods?: PaymentMethods[]
  query?: string
}
