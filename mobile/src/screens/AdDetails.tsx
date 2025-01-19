import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Icon } from '@components/Icon'
import { Loading } from '@components/Loading'
import { Box, Center, HStack, Image, Text, VStack } from '@gluestack-ui/themed'
import { useToast } from '@hooks/useToast'
import { api } from '@services/api'
import { ProductsService } from '@services/productsService'
import { AppError } from '@utils/AppError'
import { NumberUtils } from '@utils/NumberUtils'
import * as PhosphorIcons from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { Linking, ScrollView, TouchableOpacity } from 'react-native'
import { PaymentMethods, ProductDTO } from '../dtos/ProductDTO'
import { Carousel } from '@components/Carousel'

function getPaymentMethodIcon(key: PaymentMethods): keyof typeof PhosphorIcons {
  switch (key) {
    case 'boleto': {
      return 'Barcode'
    }
    case 'card': {
      return 'CreditCard'
    }
    case 'cash': {
      return 'Money'
    }
    case 'deposit': {
      return 'Bank'
    }
    case 'pix': {
      return 'PixLogo'
    }
    default: {
      return 'Coins'
    }
  }
}

export function AdDetails({ navigation, route }: AppScreenProps<'AdDetails'>) {
  const { productId } = route.params
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

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
      <VStack px="$6" pb="$3">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as="ArrowLeft" />
        </TouchableOpacity>
      </VStack>
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Carousel data={product.product_images} />
        <VStack px="$6" pt="$5">
          <HStack alignItems="center" gap="$2" mb="$5">
            <Avatar path={product.user.avatar} />
            <Text fontSize="$sm" color="$gray100">
              {product.user.name}
            </Text>
          </HStack>
          <VStack gap="$2">
            <Box
              rounded="$full"
              px="$2"
              py="$0.5"
              bgColor="$gray500"
              alignSelf="flex-start"
            >
              <Text
                fontSize="$xs"
                lineHeight="$xs"
                fontFamily="$heading"
                color="$gray200"
                textTransform="uppercase"
              >
                {product.is_new ? 'novo' : 'usado'}
              </Text>
            </Box>
            <HStack justifyContent="space-between" alignItems="center" gap="$1">
              <Text
                fontSize="$xl"
                fontFamily="$heading"
                color="$gray100"
                textTransform="capitalize"
                numberOfLines={2}
              >
                {product.name}
              </Text>
              <Text fontSize="$sm" fontFamily="$heading" color="$blueLight">
                R${' '}
                <Text
                  fontSize="$xl"
                  fontFamily="$heading"
                  color="$blueLight"
                  numberOfLines={1}
                >
                  {NumberUtils.formatToReal(product.price)}
                </Text>
              </Text>
            </HStack>
            <Text fontSize="$sm" lineHeight="$sm" color="$gray200">
              {product.description}
            </Text>
            <VStack gap="$4">
              <HStack gap="$2" alignItems="center">
                <Text fontSize="$sm" fontFamily="$heading" color="$gray200">
                  Aceita troca?
                </Text>
                <Text fontSize="$sm" color="$gray200">
                  {product.accept_trade ? 'Sim' : 'Não'}
                </Text>
              </HStack>
              <VStack gap="$1">
                {product.payment_methods.map(({ key, name }) => (
                  <HStack gap="$2" alignItems="center" key={key}>
                    <Icon as={getPaymentMethodIcon(key)} size={18} />
                    <Text fontSize="$sm" color="$gray200">
                      {name}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
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
    </VStack>
  )
}
