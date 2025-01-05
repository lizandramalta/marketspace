import { Box, Center, Image } from '@gluestack-ui/themed'
import { ImageUtils } from '@utils/imageUtils'
import { useState } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

type Props = {
  onPickAvatar: (uri: string) => void
}

export function PickAvatarButton({ onPickAvatar }: Props) {
  const [selectedAvatarUri, setSelectedAvatarUri] = useState('')
  const toast = useToast()

  async function handlePickImage() {
    try {
      const avatarUri = await ImageUtils.pickImage()
      if (avatarUri.length) {
        setSelectedAvatarUri(avatarUri)
        onPickAvatar(avatarUri)
      }
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'avatar-error',
          title: error.message
        })
      }
    }
  }

  return (
    <Box>
      {!!selectedAvatarUri ? (
        <Image
          rounded="$full"
          w={88}
          h={88}
          borderWidth={3}
          borderColor="$blueLight"
          source={{ uri: selectedAvatarUri }}
          defaultSource={{ uri: selectedAvatarUri }}
          alt="Foto do usuário"
        />
      ) : (
        <Center
          rounded="$full"
          w={88}
          h={88}
          borderWidth={3}
          borderColor="$blueLight"
        >
          <Icon as="User" weight="bold" color="gray400" size={44} />
        </Center>
      )}
      <Button
        icon="PencilSimpleLine"
        rounded="$full"
        w="$10"
        h="$10"
        theme="blue"
        position="absolute"
        bottom={0}
        right={-6}
        onPress={handlePickImage}
      />
    </Box>
  )
}
