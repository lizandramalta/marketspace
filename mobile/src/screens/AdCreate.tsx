import {
  AcceptTradeSwitchInput,
  Button,
  Icon,
  Input,
  IsNewStatusRadioInput,
  PaymentMethodsCheckboxInput
} from '@components/index'
import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@hooks/useAuth'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'
import { ImageUtils } from '@utils/imageUtils'
import { NumberUtils } from '@utils/NumberUtils'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'
import { PaymentMethods, ProductCreateDTO } from '../dtos/ProductDTO'

type FormDataProps = {
  name: string
  description: string
  is_new: string
  price: string
  accept_trade: boolean
  payment_methods: PaymentMethods[]
}

const formSchema = yup.object({
  name: yup.string().required('Insira um título para seu anúncio.'),
  description: yup.string().required('Insira uma descrição para seu anúncio.'),
  is_new: yup.string().required('Insira o status do seu produto.'),
  price: yup.string().required('Insira um preço para o seu produto.'),
  accept_trade: yup.boolean().default(false),
  payment_methods: yup
    .array()
    .required('Selecione pelo menos 1 meio de pagamento.')
})

export function AdCreate({ navigation }: AppScreenProps<'AdCreate'>) {
  const [images, setImages] = useState<string[]>([])
  const { user } = useAuth()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(formSchema) })

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleAddImage() {
    try {
      const selectedImage = await ImageUtils.pickImage()
      if (selectedImage.length) {
        setImages([...images, selectedImage])
      }
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'image-error-toast',
          title: error.message
        })
      }
    }
  }

  function handleRemoveImage(uri: string) {
    const newImages = images.filter((item) => item !== uri)
    setImages(newImages)
  }

  function handleCreateAd(data: FormDataProps) {
    const product: ProductCreateDTO = {
      ...data,
      is_new: data.is_new === 'yes',
      price: NumberUtils.parseMoney(data.price),
      product_images: images
    }

    navigation.navigate('AdPreview', { product })
  }

  return (
    <VStack flex={1}>
      <VStack pt="$16" bgColor="$gray600" px="$6" gap="$6">
        <HStack alignItems="center" justifyContent="space-between">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as="ArrowLeft" />
          </TouchableOpacity>
          <Heading flex={1} textAlign="center" color="$gray100">
            Criar anúncio
          </Heading>
          <Box w="$6" h="$6" />
        </HStack>
        <KeyboardAwareScrollView
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ paddingBottom: 180 }}
          showsVerticalScrollIndicator={false}
        >
          <VStack gap="$8">
            <VStack gap="$4">
              <VStack gap="$1">
                <Text fontFamily="$heading" color="$gray200" fontSize="$md">
                  Imagens
                </Text>
                <Text color="$gray300" fontSize="$sm" lineHeight="$sm">
                  Escolha até 3 imagens para mostrar o quando o seu produto é
                  incrível!
                </Text>
              </VStack>
              <HStack gap="$2" flexWrap="wrap">
                {images.length > 0 &&
                  images.map((item) => (
                    <Box key={item}>
                      <Image
                        source={{ uri: item }}
                        defaultSource={{ uri: item }}
                        resizeMode="cover"
                        alt="Foto do produto"
                        w={100}
                        h={100}
                        rounded="$md"
                      />
                      <Box
                        position="absolute"
                        top={5}
                        right={5}
                        bgColor="$gray700"
                        rounded="$full"
                        w="$3"
                        h="$3"
                      >
                        <TouchableOpacity
                          onPress={() => handleRemoveImage(item)}
                          style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Icon
                            as="XCircle"
                            color="gray200"
                            weight="fill"
                            size={16}
                          />
                        </TouchableOpacity>
                      </Box>
                    </Box>
                  ))}
                {images.length < 3 && (
                  <TouchableOpacity onPress={handleAddImage}>
                    <Center w={100} h={100} rounded="$md" bgColor="$gray500">
                      <Icon as="Plus" color="gray400" />
                    </Center>
                  </TouchableOpacity>
                )}
              </HStack>
            </VStack>
            <VStack gap="$4">
              <Text fontFamily="$heading" color="$gray200" fontSize="$md">
                Sobre o produto
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Título do produto"
                    errorMessage={errors.name?.message}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Descrição do produto"
                    errorMessage={errors.description?.message}
                    onChangeText={onChange}
                    value={value}
                    textArea
                    multiline
                    h={136}
                  />
                )}
              />
              <Controller
                control={control}
                name="is_new"
                render={({ field: { onChange, value } }) => (
                  <IsNewStatusRadioInput
                    value={value}
                    onChange={onChange}
                    errorMessage={errors.is_new?.message}
                  />
                )}
              />
            </VStack>
            <VStack gap="$4">
              <Text fontFamily="$heading" color="$gray200" fontSize="$md">
                Venda
              </Text>
              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Valor do produto"
                    errorMessage={errors.price?.message}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                    mask="money"
                    leftComponent={
                      <Text color="$gray100" fontSize="$md" lineHeight="$md">
                        R$
                      </Text>
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name="accept_trade"
                render={({ field: { onChange, value } }) => (
                  <AcceptTradeSwitchInput
                    value={value}
                    onValueChange={onChange}
                    errorMessage={errors.accept_trade?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="payment_methods"
                render={({ field: { onChange, value } }) => (
                  <PaymentMethodsCheckboxInput
                    value={value}
                    onChange={onChange}
                    errorMessage={errors.payment_methods?.message}
                  />
                )}
              />
            </VStack>
          </VStack>
        </KeyboardAwareScrollView>
      </VStack>
      <HStack
        alignItems="center"
        w="$full"
        px="$6"
        pt="$5"
        pb="$8"
        gap="$3"
        position="absolute"
        bottom={0}
        left={0}
        bgColor="$gray700"
      >
        <Button title="Cancelar" theme="gray" flex={1} onPress={handleGoBack} />
        <Button
          title="Avançar"
          flex={1}
          onPress={handleSubmit(handleCreateAd)}
        />
      </HStack>
    </VStack>
  )
}
