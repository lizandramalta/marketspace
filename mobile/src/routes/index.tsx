import { Box, useToken } from '@gluestack-ui/themed'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { useAuth } from '@hooks/useAuth'
import { AppRoutes } from './app.routes'
import { Loading } from '@components/Loading'

export function Routes() {
  const { isLoadingUserData, user } = useAuth()
  const backgroundColor = useToken('colors', 'gray700')

  const theme = DefaultTheme
  theme.colors.background = backgroundColor

  if (isLoadingUserData) {
    return <Loading />
  }

  return (
    <Box flex={1} bgColor="$gray700">
      <NavigationContainer>
        {!!user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
