import * as PhosphorIcons from 'phosphor-react-native'
import { customizedColors } from '../../config/gluestack-ui.config'

export type IconColor = keyof typeof customizedColors

type Props = {
  as: keyof typeof PhosphorIcons
  color?: IconColor
  size?: number
  weight?: 'regular' | 'bold' | 'fill'
}

export function Icon({
  as,
  color = 'gray100',
  size = 24,
  weight = 'regular'
}: Props) {
  const IconComponent = PhosphorIcons[as] as React.ElementType

  if (!IconComponent) {
    return null
  }

  const hexColor = customizedColors[color]

  return <IconComponent color={hexColor} size={size} weight={weight} />
}
