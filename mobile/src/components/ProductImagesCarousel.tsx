import { Box, Center, Text } from '@gluestack-ui/themed'
import { ProductImage } from '../dtos/ProductDTO'
import { Carousel } from './Carousel'
import { api } from '@services/api'

type Props = {
  images: string[] | ProductImage[]
  productInactive?: boolean
}

export function ProductImagesCarousel({ images, productInactive }: Props) {
  const data = images.every(
    (image) => typeof image === 'object' && 'path' in image
  )
    ? (images as ProductImage[]).map(
        (image) => `${api.defaults.baseURL}/images/${image.path}`
      )
    : (images as string[])

  return (
    <Box>
      <Carousel data={data} />
      {productInactive && (
        <Center
          w="$full"
          h={378}
          bgColor="$gray100"
          opacity={0.8}
          position="absolute"
          top={0}
        >
          <Text
            fontFamily="$heading"
            fontSize="$sm"
            color="$gray700"
            textTransform="uppercase"
          >
            Anúncio desativado
          </Text>
        </Center>
      )}
    </Box>
  )
}
