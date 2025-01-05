import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn, SignUp } from '@screens/index'

const { Navigator, Screen } = createNativeStackNavigator<AuthParamList>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SingUp" component={SignUp} />
    </Navigator>
  )
}
