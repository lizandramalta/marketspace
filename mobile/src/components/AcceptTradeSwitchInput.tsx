import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Switch,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { ComponentProps, useEffect, useState } from 'react'

type Props = ComponentProps<typeof Switch> & {
  errorMessage?: string
}

export function AcceptTradeSwitchInput({ errorMessage, ...rest }: Props) {
  const [isInvalid, setIsInvalid] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsInvalid(!!errorMessage)
    setError(errorMessage ? errorMessage : '')
  }, [errorMessage])

  return (
    <VStack gap="$3" alignItems="flex-start">
      <Text fontFamily="$heading" color="$gray200" fontSize="$sm">
        Aceita troca?
      </Text>
      <FormControl isInvalid={isInvalid}>
        <Switch
          thumbColor="$gray700"
          trackColor={{ false: '$gray500', true: '$blueLight' }}
          ios_backgroundColor="$gray500"
          {...rest}
        />
        <FormControlError>
          <FormControlErrorText color="$redLight">{error}</FormControlErrorText>
        </FormControlError>
      </FormControl>
    </VStack>
  )
}
