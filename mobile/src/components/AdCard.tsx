import { Badge, Box, Image, Text, VStack } from '@gluestack-ui/themed'
import { TouchableOpacity } from 'react-native'
import { ProductDTO } from '../dtos/ProductDTO'
import { api } from '@services/api'
import { Avatar } from './Avatar'
import { NumberUtils } from '@utils/NumberUtils'
import { DimensionsUtils } from '@utils/DimensionsUtils'

type Props = {
  product: ProductDTO
}

export function AdCard({ product }: Props) {
  return (
    <TouchableOpacity>
      <VStack
        flex={1}
        w={DimensionsUtils.calculateSizeRelativeToFixedScreenWidth(153.5)}
        mb="$6"
      >
        <Box>
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
          <Avatar
            w={23}
            h="$6"
            borderColor="$gray700"
            position="absolute"
            top={4}
            left={3.85}
          />
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
          color="$gray200"
          ml="$0.5"
          mt="$2"
        >
          {product.name}
        </Text>
        <Text
          fontSize="$md"
          lineHeight="$md"
          fontFamily="$heading"
          color="$gray100"
          ml="$0.5"
        >
          <Text fontSize="$xs">R$</Text>{' '}
          {NumberUtils.formatToReal(product.price)}
        </Text>
      </VStack>
    </TouchableOpacity>
  )
}
