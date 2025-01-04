import { Icon } from '@components/Icon'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { config } from './config/gluestack-ui.config'
import {
  useFonts,
  Karla_700Bold,
  Karla_400Regular
} from '@expo-google-fonts/karla'
import { Button } from '@components/Button'

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  if (!fontsLoaded) {
    return
  }

  return (
    <GluestackUIProvider config={config}>
      <View style={styles.container}>
        <Button title="Button" icon="Tag" theme="gray" />
        <Button title="Button" icon="Tag" />
        <StatusBar style="auto" />
      </View>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    gap: 8
  }
})
