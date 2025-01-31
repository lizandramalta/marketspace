import {
  Button,
  ProductDetails,
  ProductImagesCarousel
} from '@components/index'
import { Box, Center, HStack, Text, VStack } from '@gluestack-ui/themed'
import { useAuth } from '@hooks/useAuth'
import { useToast } from '@hooks/useToast'
import { ProductsService } from '@services/productsService'
import { AppError } from '@utils/AppError'
import { ImageUtils } from '@utils/imageUtils'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import {
  PaymentMethods,
  ProductCreateDTO,
  ProductDTO
} from '../dtos/ProductDTO'

const PaymentMethodsName: Record<PaymentMethods, string> = {
  pix: 'Pix',
  card: 'Cartão de Crédito',
  boleto: 'Boleto',
  cash: 'Dinheiro',
  deposit: 'Débito em Conta'
}

export function AdPreview({ navigation, route }: AppScreenProps<'AdPreview'>) {
  const { product, deletedImages } = route.params
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const payment_methods = product.payment_methods.map((item) => ({
    key: item as PaymentMethods,
    name: PaymentMethodsName[item as PaymentMethods]
  }))

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleEditProductImages() {
    try {
      if ('id' in product) {
        if (deletedImages?.length) {
          await ProductsService.deleteProductImages(deletedImages)
        }
        const images = product.product_images.filter(
          (item) => !deletedImages?.includes(item)
        )
        await ProductsService.addProductImage(product.id, images)
      }
    } catch (error) {
      if (
        error instanceof AppError &&
        error.message === 'É obrigatório o envio de imagens.'
      ) {
        return
      }
      throw error
    }
  }

  async function handleAddProductImage(id: string) {
    try {
      const images = product.product_images.map((item) =>
        ImageUtils.getImageFileInfo(user!.name, item as string)
      )
      await ProductsService.addProductImage(id, images)
    } catch (error) {
      throw error
    }
  }

  async function handleCreateAdd() {
    try {
      const data = await ProductsService.createProduct(
        product as ProductCreateDTO
      )
      await handleAddProductImage(data.id)
    } catch (error) {
      throw error
    }
  }

  async function handleEditAdd() {
    try {
      await ProductsService.editProduct(product as ProductDTO)
      await handleEditProductImages()
    } catch (error) {
      throw error
    }
  }

  async function handlePublish() {
    try {
      setIsLoading(true)
      if ('id' in product) {
        await handleEditAdd()
      } else {
        handleCreateAdd()
      }
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'submit-ad-error-toast',
          title: error.message
        })
      }
    } finally {
      navigation.navigate('Root', { screen: 'UserAds' })
    }
  }

  return (
    <VStack flex={1} bgColor="$gray600">
      <Center pt="$16" pb="$4" bgColor="$blueLight">
        <Text
          fontSize="$md"
          lineHeight="$md"
          fontFamily="$heading"
          color="$gray700"
          textAlign="center"
        >
          Pré visualização do anúncio
        </Text>
        <Text
          fontSize="$sm"
          lineHeight="$sm"
          color="$gray700"
          textAlign="center"
        >
          É assim que seu produto vai aparecer!
        </Text>
      </Center>
      <ScrollView
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        {product.product_images.length > 0 && (
          <ProductImagesCarousel images={product.product_images} />
        )}
        <Box px="$6" pt="$5">
          <ProductDetails
            product={{ ...product, user: user!, payment_methods }}
          />
        </Box>
      </ScrollView>
      <HStack
        position="absolute"
        bottom={0}
        bgColor="$gray700"
        pt="$5"
        pb="$8"
        px="$6"
        gap="$3"
        alignItems="center"
        w="$full"
      >
        <Button
          title="Voltar e editar"
          icon="ArrowLeft"
          theme="gray"
          flex={1}
          onPress={handleGoBack}
        />
        <Button
          title="Publicar"
          icon="Tag"
          theme="blue"
          flex={1}
          isLoading={isLoading}
          onPress={handlePublish}
        />
      </HStack>
    </VStack>
  )
}
