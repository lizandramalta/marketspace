import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GluestackInput,
  InputField
} from '@gluestack-ui/themed'
import { MaskUtils } from '@utils/MaskUtils'
import { ComponentProps, ReactNode, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from './Icon'

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string
  isPasswordInput?: boolean
  mask?: 'phone' | 'money'
  leftComponent?: ReactNode
  rightComponent?: ReactNode
  textArea?: boolean
}

export function Input({
  errorMessage,
  isPasswordInput,
  children,
  mask,
  onChangeText,
  leftComponent,
  rightComponent,
  textArea,
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

  function applyMask(value: string) {
    switch (mask) {
      case 'phone': {
        return MaskUtils.phoneMask(value)
      }
      case 'money': {
        return MaskUtils.moneyMask(value)
      }
      default: {
        return value
      }
    }
  }

  function handleChange(text: string) {
    const maskedValue = mask ? applyMask(text) : text
    if (maskedValue == '0,00') {
      onChangeText?.('')
    } else {
      onChangeText?.(maskedValue)
    }
  }

  useEffect(() => {
    setIsInvalid(!!errorMessage)
    setError(errorMessage ? errorMessage : '')
  }, [errorMessage])

  return (
    <FormControl isInvalid={isInvalid}>
      <GluestackInput
        height={textArea ? 160 : 45}
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
        {leftComponent && leftComponent}
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
          onChangeText={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {isPasswordInput && (
          <TouchableOpacity onPress={handleShowPassword}>
            <Icon as={isShowingPassword ? 'EyeSlash' : 'Eye'} />
          </TouchableOpacity>
        )}
        {rightComponent && rightComponent}
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color="$redLight">{error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
