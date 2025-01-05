import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  InputField
} from '@gluestack-ui/themed'
import { ComponentProps, useEffect, useState } from 'react'
import { Input as GluestackInput } from '@gluestack-ui/themed'
import { Icon } from './Icon'
import { TouchableOpacity } from 'react-native'

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string
  isPasswordInput?: boolean
}

export function Input({
  errorMessage,
  isPasswordInput,
  children,
  ...rest
}: Props) {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [error, setError] = useState('')

  function handleFocus() {
    if (!!errorMessage) {
      setIsInvalid(false)
      setError('')
    }
  }

  function handleBlur() {
    if (!!errorMessage) {
      setIsInvalid(true)
      setError(errorMessage)
    }
  }

  function handleShowPassword() {
    setIsShowingPassword(!isShowingPassword)
  }

  useEffect(() => {
    if (errorMessage) {
      setIsInvalid(!!errorMessage)
      setError(errorMessage)
    }
  }, [errorMessage])

  return (
    <FormControl isInvalid={isInvalid}>
      <GluestackInput
        height={45}
        gap="$2"
        w="$full"
        px="$3"
        rounded="$md"
        bgColor="$gray700"
        borderWidth={0}
        $focus={{
          borderWidth: 1,
          borderColor: '$gray300'
        }}
        alignItems="center"
        $invalid={{
          borderWidth: 1,
          borderColor: '$redLight'
        }}
      >
        {children}
        <InputField
          my="$3"
          px={0}
          placeholderTextColor="$gray400"
          fontFamily="$body"
          fontSize="$md"
          color="$gray300"
          textAlignVertical="center"
          lineHeight="$md"
          secureTextEntry={isPasswordInput && !isShowingPassword}
          {...rest}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {isPasswordInput && (
          <TouchableOpacity onPress={handleShowPassword}>
            <Icon as={isShowingPassword ? 'EyeSlash' : 'Eye'} />
          </TouchableOpacity>
        )}
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color="$redLight">{error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
