import { AppError } from '@utils/AppError'
import { api } from './api'
import { ProductDTO, ProductQueryParamsDTO } from '../dtos/ProductDTO'

async function listProducts(
  queryParams?: ProductQueryParamsDTO
): Promise<ProductDTO[]> {
  try {
    const { data } = await api.get('/products', { params: { ...queryParams } })
    return data
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível listar os anúncios dispoíveis. Tente novamente mais tarde.'
    )
  }
}

async function listUserProducts(): Promise<ProductDTO[]> {
  try {
    const { data } = await api.get('/users/products')
    return data
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível listar seus anúncios. Tente novamente mais tarde.'
    )
  }
}

export const ProductsService = {
  listProducts,
  listUserProducts
}
