import { Image } from '@gluestack-ui/themed'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { customizedColors } from '../../config/gluestack-ui.config'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Image>

export function Avatar({ ...rest }: Props) {
  const { user } = useAuth()

  return (
    <Image
      rounded="$full"
      w={45}
      h={45}
      borderWidth={3}
      borderColor="$blueLight"
      source={{ uri: `${api.defaults.baseURL}/images/${user?.avatar}` }}
      defaultSource={{ uri: `${api.defaults.baseURL}/images/${user?.avatar}` }}
      alt="Foto do usuário"
      {...rest}
    />
  )
}
