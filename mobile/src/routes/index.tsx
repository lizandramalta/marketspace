import { Box } from '@gluestack-ui/themed'
import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  return (
    <Box flex={1} bgColor="$gray700">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
