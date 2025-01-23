import {
  CircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorText,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel
} from '@gluestack-ui/themed'
import { ComponentProps, useEffect, useState } from 'react'

type Props = ComponentProps<typeof RadioGroup> & {
  errorMessage?: string
}

export function IsNewStatusRadioInput({ errorMessage, ...rest }: Props) {
  const [isInvalid, setIsInvalid] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsInvalid(!!errorMessage)
    setError(errorMessage ? errorMessage : '')
  }, [errorMessage])

  return (
    <FormControl isInvalid={isInvalid}>
      <RadioGroup {...rest}>
        <HStack alignItems="center" gap="$5">
          <Radio value="yes" size="md">
            <RadioIndicator
              mr="$2"
              borderColor="$gray400"
              $checked={{
                borderColor: '$blueLight'
              }}
            >
              <RadioIcon as={CircleIcon} color="$blueLight" size="xs" />
            </RadioIndicator>
            <RadioLabel color="$gray200">Produto novo</RadioLabel>
          </Radio>
          <Radio value="no" size="md">
            <RadioIndicator
              mr="$2"
              borderColor="$gray400"
              $checked={{
                borderColor: '$blueLight'
              }}
            >
              <RadioIcon as={CircleIcon} color="$blueLight" size="xs" />
            </RadioIndicator>
            <RadioLabel color="$gray200">Produto usado</RadioLabel>
          </Radio>
        </HStack>
      </RadioGroup>
      <FormControlError>
        <FormControlErrorText color="$redLight">{error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
