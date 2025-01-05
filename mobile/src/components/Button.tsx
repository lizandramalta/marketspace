import {
  ButtonSpinner,
  ButtonText,
  Button as GluestackButton
} from '@gluestack-ui/themed'
import * as PhosphorIcons from 'phosphor-react-native'
import { ComponentProps } from 'react'
import { Icon } from './Icon'

type ButtonTheme = 'blue' | 'black' | 'gray'

type Props = ComponentProps<typeof GluestackButton> & {
  title?: string
  icon?: keyof typeof PhosphorIcons
  theme?: ButtonTheme
  isLoading?: boolean
}

export function Button({
  title,
  icon,
  theme = 'black',
  isLoading = false,
  ...rest
}: Props) {
  return (
    <GluestackButton
      w="$full"
      gap="$2"
      p="$3"
      maxHeight={42}
      rounded="$md"
      alignItems="center"
      bgColor={
        theme === 'black'
          ? '$gray100'
          : theme === 'blue'
          ? '$blueLight'
          : '$gray500'
      }
      isDisabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color={theme === 'gray' ? '$gray200' : '$gray700'} />
      ) : (
        <>
          {icon && (
            <Icon
              as={icon}
              color={theme === 'gray' ? 'gray200' : 'gray700'}
              size={16}
              weight="bold"
            />
          )}
          {!!title && (
            <ButtonText
              color={theme === 'gray' ? '$gray200' : '$gray700'}
              fontFamily="$heading"
              fontSize="$sm"
            >
              {title}
            </ButtonText>
          )}
        </>
      )}
    </GluestackButton>
  )
}
