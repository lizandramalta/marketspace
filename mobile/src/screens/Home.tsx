import { Filters, FiltersRef } from '@components/Filters'
import { AdCard, Avatar, Button, Icon, Input, Loading } from '@components/index'
import { Center, HStack, Text, VStack } from '@gluestack-ui/themed'
import { useAuth } from '@hooks/useAuth'
import { useToast } from '@hooks/useToast'
import { useFocusEffect } from '@react-navigation/native'
import { ProductsService } from '@services/productsService'
import { AppError } from '@utils/AppError'
import { useCallback, useRef, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { ProductDTO, ProductQueryParamsDTO } from '../dtos/ProductDTO'

export function Home({ navigation }: AppScreenProps<'Home'>) {
  const { user } = useAuth()
  const [ads, setAds] = useState<ProductDTO[]>()
  const [userActiveAds, setUserActiveAds] = useState(0)
  const [querySearch, setQuerySearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const filtersRef = useRef<FiltersRef>(null)

  function handleShowFilters() {
    filtersRef.current?.showMoreFilters()
  }

  async function handleSearchByQuery() {
    fetchAdsWithFilters({ query: querySearch })
  }

  function handleResetFilters() {
    setQuerySearch('')
  }

  function InputButtons() {
    return (
      <HStack alignItems="center" gap={3}>
        <TouchableOpacity onPress={handleSearchByQuery}>
          <Icon as="MagnifyingGlass" size={20} color="gray200" weight="bold" />
        </TouchableOpacity>
        <Icon as="LineVertical" size={18} color="gray400" />
        <TouchableOpacity onPress={handleShowFilters}>
          <Icon as="Sliders" size={20} color="gray200" weight="bold" />
        </TouchableOpacity>
      </HStack>
    )
  }

  async function fetchAds(params?: ProductQueryParamsDTO) {
    try {
      setIsLoading(true)
      const data = await ProductsService.listProducts(params)
      setAds(data)
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

  async function fetchUserAds() {
    try {
      setIsLoading(true)
      const data = await ProductsService.listUserProducts()
      setUserActiveAds(data.filter((item) => item.is_active).length)
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

  async function fetchAdsWithFilters(filters: ProductQueryParamsDTO) {
    const params = {
      query: querySearch,
      ...filters
    }
    await fetchAds(params)
  }

  useFocusEffect(
    useCallback(() => {
      fetchAds()
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      fetchUserAds()
    }, [])
  )

  return (
    <VStack flex={1} bgColor="$gray600" pt="$16" px="$6" gap="$8">
      <HStack alignItems="center" gap="$2">
        <Avatar path={user?.avatar} />
        <VStack flex={1}>
          <Text fontSize="$md" lineHeight="$md" color="$gray100">
            Boas vindas,
          </Text>
          <Text
            fontSize="$md"
            lineHeight="$md"
            fontFamily="$heading"
            color="$gray100"
            numberOfLines={1}
          >
            {user?.name.split(' ')[0]}
          </Text>
        </VStack>
        <Button title="Criar anúncio" icon="Plus" w={139} />
      </HStack>
      <VStack gap="$3">
        <Text fontSize="$sm" color="$gray300">
          Seus produtos anunciados para venda
        </Text>
        <HStack
          py="$3"
          pl="$4"
          pr="$5"
          rounded="$md"
          bgColor="$blueLightWithOpacity"
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack gap="$4" alignItems="center">
            <Icon as="Tag" color="blue" size={22} />
            <VStack>
              <Text
                fontSize="$xl"
                lineHeight="$xl"
                fontFamily="$heading"
                color="$gray200"
              >
                {userActiveAds}
              </Text>
              <Text fontSize="$xs" lineHeight="$xs" color="$gray200">
                anúncios ativos
              </Text>
            </VStack>
          </HStack>
          <TouchableOpacity>
            <HStack gap="$2" alignItems="center">
              <Text
                fontSize="$xs"
                lineHeight="$xs"
                color="$blue"
                fontFamily="$heading"
              >
                Meus anúncios
              </Text>
              <Icon as="ArrowRight" color="blue" size={16} />
            </HStack>
          </TouchableOpacity>
        </HStack>
      </VStack>
      <VStack gap="$6" flex={1}>
        <VStack gap="$3">
          <Text fontSize="$sm" color="$gray300">
            Compre produtos variados
          </Text>
          <Input
            placeholder="Buscar anúncio"
            value={querySearch}
            onChangeText={setQuerySearch}
            rightComponet={<InputButtons />}
          />
        </VStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={ads}
            renderItem={({ item }) => <AdCard product={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            ListEmptyComponent={() => (
              <Center mt="$10">
                <Text fontSize="$md" lineHeight="$md" color="$gray300">
                  Não há anúncios disponíveis no momento.
                </Text>
              </Center>
            )}
          />
        )}
      </VStack>
      <Filters
        onApplyFilters={fetchAdsWithFilters}
        onResetFilters={handleResetFilters}
        ref={filtersRef}
      />
    </VStack>
  )
}
