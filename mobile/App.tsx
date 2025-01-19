import {
  Karla_300Light,
  Karla_400Regular,
  Karla_700Bold,
  useFonts
} from '@expo-google-fonts/karla'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Routes } from '@routes/index'
import { config } from './config/gluestack-ui.config'
import { Loading } from '@components/Loading'
import { StatusBar } from 'react-native'
import { AuthProvider } from '@contexts/authContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigatorOptionsProvider } from '@contexts/navigatorOptionsContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold
  })

  return (
    <GluestackUIProvider config={config}>
      <NavigatorOptionsProvider>
        <AuthProvider>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          <GestureHandlerRootView style={{ flex: 1 }}>
            {fontsLoaded ? <Routes /> : <Loading />}
          </GestureHandlerRootView>
        </AuthProvider>
      </NavigatorOptionsProvider>
    </GluestackUIProvider>
  )
}
