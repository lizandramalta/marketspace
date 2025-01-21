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

async function getProductById(id: string): Promise<ProductDTO> {
  try {
    const { data } = await api.get(`/products/${id}`)
    return data
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi detalhar esse produto. Tente novamente mais tarde.'
    )
  }
}

async function patchProductActiveStatus(
  id: string,
  active: boolean
): Promise<void> {
  try {
    return await api.patch(`/products/${id}`, { is_active: active })
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi atualizar o status do produto. Tente novamente mais tarde.'
    )
  }
}

async function deleteProductById(id: string): Promise<void> {
  try {
    return await api.delete(`/products/${id}`)
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi excluir esse produto. Tente novamente mais tarde.'
    )
  }
}

export const ProductsService = {
  listProducts,
  listUserProducts,
  getProductById,
  patchProductActiveStatus,
  deleteProductById
}
