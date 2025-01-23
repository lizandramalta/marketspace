import { AppError } from '@utils/AppError'
import { api } from './api'
import {
  ProductCreateDTO,
  ProductDTO,
  ProductQueryParamsDTO
} from '../dtos/ProductDTO'

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

async function createProduct(data: ProductCreateDTO): Promise<ProductDTO> {
  try {
    const { data: response } = await api.post(`/products/`, data)
    return response
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi criar esse anúncio. Tente novamente mais tarde.'
    )
  }
}

async function addProductImage(id: string, images: any[]): Promise<void> {
  try {
    const formData = new FormData()
    formData.append('product_id', id)
    images.forEach((image) => {
      formData.append('images', image)
    })
    await api.post(`/products/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi adicionar imagens ao anúncio. Tente novamente mais tarde.'
    )
  }
}

export const ProductsService = {
  listProducts,
  listUserProducts,
  getProductById,
  patchProductActiveStatus,
  deleteProductById,
  createProduct,
  addProductImage
}
