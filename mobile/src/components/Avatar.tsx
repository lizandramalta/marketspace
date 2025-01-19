import { Image } from '@gluestack-ui/themed'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Image> & {
  path?: string
  size?: number
}

export function Avatar({ path, size, ...rest }: Props) {
  return (
    <Image
      rounded="$full"
      w={size ?? 45}
      h={size ?? 45}
      borderWidth={3}
      borderColor="$blueLight"
      source={{ uri: `${api.defaults.baseURL}/images/${path}` }}
      defaultSource={{ uri: `${api.defaults.baseURL}/images/${path}` }}
      alt="Foto do usuário"
      {...rest}
    />
  )
}
