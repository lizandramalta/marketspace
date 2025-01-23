import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { ComponentProps, useEffect, useState } from 'react'
import { PaymentMethods } from '../dtos/ProductDTO'

type PaymentMethodsOption = {
  key: PaymentMethods
  name: string
}

const paymentMethodsOptions: PaymentMethodsOption[] = [
  {
    key: 'boleto',
    name: 'Boleto'
  },
  {
    key: 'pix',
    name: 'Pix'
  },
  {
    key: 'cash',
    name: 'Dinheiro'
  },
  {
    key: 'card',
    name: 'Cartão de Crédito'
  },
  {
    key: 'deposit',
    name: 'Deposito Bancário'
  }
]

type Props = ComponentProps<typeof CheckboxGroup> & {
  errorMessage?: string
}

export function PaymentMethodsCheckboxInput({ errorMessage, ...rest }: Props) {
  const [isInvalid, setIsInvalid] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsInvalid(!!errorMessage)
    setError(errorMessage ? errorMessage : '')
  }, [errorMessage])

  return (
    <VStack gap="$3">
      <Text fontFamily="$heading" color="$gray200" fontSize="$sm">
        Meios de pagamento aceitos
      </Text>
      <FormControl isInvalid={isInvalid}>
        <CheckboxGroup {...rest}>
          <VStack gap="$2">
            {paymentMethodsOptions.map(({ key, name }) => (
              <Checkbox value={key} key={key}>
                <CheckboxIndicator
                  mr="$2"
                  borderColor="$gray400"
                  $checked={{
                    borderColor: '$blueLight',
                    bgColor: '$blueLight'
                  }}
                >
                  <CheckboxIcon as={CheckIcon} color="$white" />
                </CheckboxIndicator>
                <CheckboxLabel
                  color="$gray200"
                  fontSize="$md"
                  $checked-color="$gray200"
                >
                  {name}
                </CheckboxLabel>
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
        <FormControlError>
          <FormControlErrorText color="$redLight">{error}</FormControlErrorText>
        </FormControlError>
      </FormControl>
    </VStack>
  )
}
