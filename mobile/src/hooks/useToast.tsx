import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast as useGluestackToast
} from '@gluestack-ui/themed'

type Props = {
  id: string
  title: string
  description?: string
  action?: 'success' | 'error'
}
export function useToast() {
  const gluestackToast = useGluestackToast()

  function show({ id, title, description, action = 'error' }: Props) {
    gluestackToast.show({
      placement: 'top',
      duration: 3000,
      render: () => (
        <Toast
          nativeID={id}
          action={action}
          mt="$6"
          bgColor={action === 'success' ? '$blueLight' : '$redLight'}
        >
          <ToastTitle color="$white">{title}</ToastTitle>
          {description && <ToastDescription>{description}</ToastDescription>}
        </Toast>
      )
    })
  }

  const toast = {
    show
  }

  return toast
}
