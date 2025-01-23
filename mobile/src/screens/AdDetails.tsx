import {
  Button,
  Icon,
  Loading,
  ProductDetails,
  ProductImagesCarousel
} from '@components/index'
import { Center, HStack, Text, VStack } from '@gluestack-ui/themed'
import { useToast } from '@hooks/useToast'
import { ProductsService } from '@services/productsService'
import { AppError } from '@utils/AppError'
import { NumberUtils } from '@utils/NumberUtils'
import { useEffect, useState } from 'react'
import { Linking, ScrollView, TouchableOpacity } from 'react-native'
import { ProductDTO } from '../dtos/ProductDTO'

export function AdDetails({ navigation, route }: AppScreenProps<'AdDetails'>) {
  const { productId, isUserAd } = route.params
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const inactive =
    product.is_active !== undefined ? !product.is_active : undefined

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleWppContact() {
    const url = `https://wa.me/55${product.user.tel
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '')}`
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      toast.show({
        id: 'wpp-link-error-toast',
        title: 'Não foi possível entrar em contato com o vendedor.'
      })
    }
  }

  async function handleDeleteProduct() {
    try {
      await ProductsService.deleteProductById(productId)
      toast.show({
        id: 'delete-product-success-toast',
        title: 'Anúncio excluído com succeso.',
        action: 'success'
      })
      navigation.goBack()
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'delete-product-error-toast',
          title: error.message
        })
      }
    }
  }

  async function handleChangeProductActiveStatus(active: boolean) {
    try {
      setIsLoading(true)
      await ProductsService.patchProductActiveStatus(productId, active)
      fetchProduct()
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'product-change-active-status-toast',
          title: error.message
        })
      }
    }
  }

  async function fetchProduct() {
    try {
      setIsLoading(true)
      const data = await ProductsService.getProductById(productId)
      setProduct(data)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'product-toast',
          title: error.message
        })
      }
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [productId])

  return isLoading ? (
    <Center flex={1}>
      <Loading />
    </Center>
  ) : (
    <VStack flex={1} pt="$16" bgColor="$gray600">
      <HStack
        px="$6"
        pb="$3"
        alignItems="center"
        justifyContent="space-between"
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as="ArrowLeft" />
        </TouchableOpacity>
        {isUserAd && (
          <TouchableOpacity>
            <Icon as="PencilSimpleLine" color="black" />
          </TouchableOpacity>
        )}
      </HStack>
      <ScrollView
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: isUserAd ? 30 : 150 }}
      >
        {product.product_images.length > 0 && (
          <ProductImagesCarousel
            images={product.product_images}
            productInactive={inactive}
          />
        )}
        <VStack px="$6" pt="$5">
          <ProductDetails product={product} />
          {isUserAd && (
            <VStack gap="$2" mt="$6">
              {inactive ? (
                <Button
                  title="Reativar anúncio"
                  icon="Power"
                  theme="blue"
                  onPress={() => handleChangeProductActiveStatus(true)}
                />
              ) : (
                <Button
                  title="Desativar anúncio"
                  icon="Power"
                  onPress={() => handleChangeProductActiveStatus(false)}
                />
              )}
              <Button
                title="Excluir anúncio"
                theme="gray"
                icon="TrashSimple"
                onPress={handleDeleteProduct}
              />
            </VStack>
          )}
        </VStack>
      </ScrollView>
      {!isUserAd && (
        <HStack
          position="absolute"
          bottom={0}
          bgColor="$gray700"
          pt="$5"
          pb="$8"
          px="$6"
          justifyContent="space-between"
          alignItems="center"
          w="$full"
        >
          <Text fontSize="$sm" fontFamily="$heading" color="$blue" flex={1}>
            R${' '}
            <Text
              fontSize="$2xl"
              fontFamily="$heading"
              color="$blue"
              numberOfLines={1}
            >
              {NumberUtils.formatToReal(product.price)}
            </Text>
          </Text>
          <Button
            title="Entrar em contato"
            icon="WhatsappLogo"
            theme="blue"
            onPress={handleWppContact}
            flex={1}
          />
        </HStack>
      )}
    </VStack>
  )
}
