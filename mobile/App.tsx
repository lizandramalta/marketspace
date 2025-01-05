import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts
} from '@expo-google-fonts/karla'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Routes } from '@routes/index'
import { config } from './config/gluestack-ui.config'

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  if (!fontsLoaded) {
    return
  }

  return (
    <GluestackUIProvider config={config}>
      <Routes />
    </GluestackUIProvider>
  )
}
