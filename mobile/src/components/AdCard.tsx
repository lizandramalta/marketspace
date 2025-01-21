import { Badge, Box, Image, Text, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { DimensionsUtils } from '@utils/DimensionsUtils'
import { NumberUtils } from '@utils/NumberUtils'
import { TouchableOpacity } from 'react-native'
import { ProductDTO } from '../dtos/ProductDTO'
import { Avatar } from './Avatar'

type Props = {
  product: ProductDTO
  hideUserPhoto?: boolean
  isUserAd?: boolean
}

export function AdCard({ product, hideUserPhoto, isUserAd }: Props) {
  const navigation = useNavigation()
  const inactive =
    product.is_active !== undefined ? !product.is_active : undefined

  function handleGoToAdDetails() {
    navigation.navigate('AdDetails', { productId: product.id, isUserAd })
  }

  return (
    <TouchableOpacity onPress={handleGoToAdDetails}>
      <VStack
        flex={1}
        w={DimensionsUtils.calculateSizeRelativeToFixedScreenWidth(153.5)}
        mb="$6"
      >
        <Box rounded="$md">
          <Image
            source={{
              uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`
            }}
            defaultSource={{
              uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`
            }}
            alt={`Foto do produto ${product.name}`}
            rounded="$md"
            resizeMode="cover"
            h={100}
            w="$full"
          />
          {inactive && (
            <Box
              rounded="$md"
              h={100}
              w="$full"
              position="absolute"
              top={0}
              backgroundColor="$gray100"
              opacity={0.5}
              zIndex={1}
            />
          )}
          {inactive && (
            <Text
              fontSize={11}
              fontFamily="$heading"
              color="$gray700"
              position="absolute"
              bottom={8}
              left={8}
              zIndex={2}
              textTransform="uppercase"
            >
              Anúncio desativado
            </Text>
          )}
          {!hideUserPhoto && (
            <Avatar
              w={23}
              h="$6"
              borderColor="$gray700"
              position="absolute"
              top={4}
              left={3.85}
              path={product.user.avatar}
            />
          )}
          <Badge
            rounded="$full"
            px="$2"
            py="$0.5"
            bgColor={product.is_new ? '$blue' : '$gray200'}
            position="absolute"
            top={4}
            right={3.99}
          >
            <Badge.Text fontSize={10} fontFamily="$heading" color="$white">
              {product.is_new ? 'NOVO' : 'USADO'}
            </Badge.Text>
          </Badge>
        </Box>
        <Text
          fontSize="$sm"
          lineHeight="$sm"
          color={inactive ? '$gray400' : '$gray200'}
          ml="$0.5"
          mt="$2"
        >
          {product.name}
        </Text>
        <Text
          fontSize="$md"
          lineHeight="$md"
          fontFamily="$heading"
          color={inactive ? '$gray400' : '$gray100'}
          ml="$0.5"
        >
          <Text fontSize="$xs">R$</Text>{' '}
          {NumberUtils.formatToReal(product.price)}
        </Text>
      </VStack>
    </TouchableOpacity>
  )
}
