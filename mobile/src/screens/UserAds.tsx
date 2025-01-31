import { AdCard, Icon, Loading, Selection } from '@components/index'
import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { useToast } from '@hooks/useToast'
import { useFocusEffect } from '@react-navigation/native'
import { ProductsService } from '@services/productsService'
import { AppError } from '@utils/AppError'
import { useCallback, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { ProductDTO } from '../dtos/ProductDTO'

const selectionData = [
  {
    label: 'Todos',
    value: 'all'
  },
  {
    label: 'Ativos',
    value: 'active'
  },
  {
    label: 'Inativos',
    value: 'inactive'
  }
]

export function UserAds({ navigation }: AppScreenProps<'UserAds'>) {
  const [isLoading, setIsLoading] = useState(true)
  const [ads, setAds] = useState<ProductDTO[]>()
  const toast = useToast()
  const [filterSelection, setFilterSelection] = useState(selectionData[0])

  function handleGoToAdCreate() {
    navigation.navigate('AdForm', { action: 'create' })
  }

  async function fetchUserAds() {
    try {
      setIsLoading(true)
      const data = await ProductsService.listUserProducts()
      if (filterSelection.value === 'active') {
        setAds(data.filter((item) => item.is_active))
      } else if (filterSelection.value === 'inactive') {
        setAds(data.filter((item) => !item.is_active))
      } else {
        setAds(data)
      }
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'list-ads-toast',
          title: error.message
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserAds()
    }, [filterSelection])
  )

  return (
    <VStack flex={1} bgColor="$gray600" pt="$16" px="$6" gap="$8">
      <HStack alignItems="center" justifyContent="space-between">
        <Box w="$6" h="$6" />
        <Heading flex={1} textAlign="center" color="$gray100">
          Meus anúncios
        </Heading>
        <TouchableOpacity onPress={handleGoToAdCreate}>
          <Icon as="Plus" />
        </TouchableOpacity>
      </HStack>
      <VStack gap="$5">
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$md" color="$gray200">
            {ads?.length ?? 0}{' '}
            {ads?.length && ads.length === 1 ? 'anúncio' : 'anúncios'}
          </Text>
          <Selection
            data={selectionData}
            value={filterSelection}
            onChange={(item) => setFilterSelection(item)}
          />
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={ads}
            renderItem={({ item }) => (
              <AdCard product={item} hideUserPhoto isUserAd />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={{
              flexGrow: 1
            }}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            contentContainerStyle={{
              paddingBottom: 124
            }}
            ListEmptyComponent={() => (
              <Center mt="$10">
                <Text fontSize="$md" lineHeight="$md" color="$gray300">
                  {filterSelection.value === 'all'
                    ? 'Você não possui anúncios. Que tal criar um?'
                    : filterSelection.value === 'active'
                    ? 'Você não possui anúncios ativos.'
                    : 'Você não possui anúncios inativos.'}
                </Text>
              </Center>
            )}
          />
        )}
      </VStack>
    </VStack>
  )
}
