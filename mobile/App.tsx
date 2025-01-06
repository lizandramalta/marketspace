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

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </GluestackUIProvider>
  )
}
