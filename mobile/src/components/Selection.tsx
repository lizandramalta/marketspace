import { Text, useToken } from '@gluestack-ui/themed'
import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'

type Data = {
  label: string
  value: string
}

type Props = Omit<DropdownProps<Data>, 'labelField' | 'valueField'>

export function Selection({ ...props }: Props) {
  const [isFocused, setIsFocused] = useState(false)

  const fontFamily = useToken('fonts', 'body')
  const borderColorBlur = useToken('colors', 'gray500')
  const borderColorFocus = useToken('colors', 'gray400')
  const textColor = useToken('colors', 'gray100')
  const backgroundColor = useToken('colors', 'gray700')

  function handleFocus() {
    setIsFocused(true)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  return (
    <Dropdown
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 8,
        width: 111,
        height: 34,
        borderColor: isFocused ? borderColorFocus : borderColorBlur
      }}
      fontFamily={fontFamily}
      itemTextStyle={{
        color: textColor
      }}
      selectedTextStyle={{
        fontSize: 14
      }}
      containerStyle={{
        borderRadius: 8,
        backgroundColor: backgroundColor,
        paddingHorizontal: 12,
        paddingTop: 12
      }}
      renderItem={(item, selected) => {
        return (
          <Text
            mb="$3"
            fontFamily={selected ? '$heading' : '$body'}
            fontSize="$sm"
          >
            {item.label}
          </Text>
        )
      }}
      {...props}
      labelField="label"
      valueField="value"
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )
}
