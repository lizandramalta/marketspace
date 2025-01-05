import { Box, Center } from '@gluestack-ui/themed'
import { Icon } from './Icon'
import { Button } from './Button'

type Props = {
  onPickAvatar: (uri: string) => void
}

export function PickAvatarButton({ onPickAvatar }: Props) {
  return (
    <Box>
      <Center
        rounded="$full"
        w={88}
        h={88}
        borderWidth={3}
        borderColor="$blueLight"
      >
        <Icon as="User" weight="bold" color="gray400" size={44} />
      </Center>
      <Button
        icon="PencilSimpleLine"
        rounded="$full"
        w="$10"
        h="$10"
        theme="blue"
        position="absolute"
        bottom={0}
        right={-6}
      />
    </Box>
  )
}
