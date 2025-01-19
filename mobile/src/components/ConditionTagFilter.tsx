import { HStack, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from './Icon'

type Props = {
  title: string
  value: boolean
  onChange: (value: boolean) => void
}

export function ConditionTagFilter({ onChange, title, value }: Props) {
  const [isSelected, setIsSelected] = useState(value)

  useEffect(() => {
    setIsSelected(value)
  }, [value])

  function handleSelect() {
    const newValue = !isSelected
    setIsSelected(newValue)
    onChange(newValue)
  }

  return (
    <TouchableOpacity onPress={handleSelect}>
      <HStack
        rounded="$full"
        pl="$4"
        pr={isSelected ? '$2.5' : '$4'}
        gap="$2.5"
        py="$2.5"
        alignItems="center"
        bgColor={isSelected ? '$blueLight' : '$gray500'}
      >
        <Text
          fontSize="$xs"
          lineHeight="$xs"
          fontFamily="$heading"
          color={isSelected ? '$white' : '$gray300'}
          textTransform="uppercase"
        >
          {title}
        </Text>
        {isSelected && (
          <Icon as="XCircle" size={16} weight="fill" color="white" />
        )}
      </HStack>
    </TouchableOpacity>
  )
}
