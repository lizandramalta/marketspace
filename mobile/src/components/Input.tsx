import { InputField } from '@gluestack-ui/themed'
import { ComponentProps, useState } from 'react'
import { Input as GluestackInput } from '@gluestack-ui/themed'
import { Icon } from './Icon'
import { TouchableOpacity } from 'react-native'

type Props = ComponentProps<typeof InputField>

export function Input({ secureTextEntry, children, ...rest }: Props) {
  const [isShowingPassword, setIsShowingPassword] = useState(false)

  function handleShowPassword() {
    setIsShowingPassword(!isShowingPassword)
  }

  return (
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
        borderColor: 'gray300'
      }}
      alignItems="center"
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
        secureTextEntry={!isShowingPassword}
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={handleShowPassword}>
          <Icon as={isShowingPassword ? 'EyeSlash' : 'Eye'} />
        </TouchableOpacity>
      )}
    </GluestackInput>
  )
}
