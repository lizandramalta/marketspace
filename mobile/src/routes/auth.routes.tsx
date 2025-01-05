import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn, SignUp } from '@screens/index'

const { Navigator, Screen } = createNativeStackNavigator<AuthParamList>()

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SingOut" component={SignUp} />
    </Navigator>
  )
}
