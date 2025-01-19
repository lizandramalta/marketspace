import { Box, HStack, Image } from '@gluestack-ui/themed'
import { api } from '@services/api'
import React, { useRef, useState } from 'react'
import { FlatList, useWindowDimensions, ViewToken } from 'react-native'

type Props = {
  data: {
    path: string
  }[]
}

export function Carousel({ data }: Props) {
  const { width } = useWindowDimensions()
  const [currentIndex, setCurrentIndex] = useState(0)

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const onViewableItemsChanged = ({
    viewableItems
  }: {
    viewableItems: ViewToken[]
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setCurrentIndex(viewableItems[0].index)
    }
  }

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged }
  ])

  return (
    <Box flex={1}>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: `${api.defaults.baseURL}/images/${item.path}`
            }}
            defaultSource={{
              uri: `${api.defaults.baseURL}/images/${item.path}`
            }}
            w={width}
            height={378}
            alt="Foto do produto"
            resizeMode="cover"
          />
        )}
        keyExtractor={(item) => item.path}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />

      <HStack
        position="absolute"
        bottom={2}
        left={4}
        right={4}
        justifyContent="center"
        alignItems="center"
        gap="$2"
      >
        {data.map((_, index) => (
          <Box
            key={index}
            flex={1}
            height="$1.5"
            borderRadius="full"
            bgColor={currentIndex === index ? '$gray700' : '$gray500'}
            rounded="$full"
          />
        ))}
      </HStack>
    </Box>
  )
}
