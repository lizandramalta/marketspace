import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { NumberUtils } from '@utils/NumberUtils'
import * as PhosphorIcons from 'phosphor-react-native'
import { PaymentMethods, ProductDTO } from '../dtos/ProductDTO'
import { Avatar } from './Avatar'
import { Icon } from './Icon'

type Props = {
  product: Omit<ProductDTO, 'id' | 'is_active' | 'product_images'>
}

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

export function ProductDetails({ product }: Props) {
  return (
    <VStack>
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
  )
}
