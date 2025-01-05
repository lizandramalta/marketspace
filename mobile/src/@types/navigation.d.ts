import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export declare global {
  type AuthParamList = {
    SignIn: undefined
    SingOut: undefined
  }

  type AppTabParamList = {
    Home: undefined
    UserAds: undefined
    SignOut: undefined
  }

  type AppStackParamList = {
    AdCreate: undefined
    AdDetails: undefined
    AdPreview: undefined
    Root: undefined
  }

  type AuthScreenProps<Screen extends keyof AuthParamList> =
    NativeStackScreenProps<AuthParamList, Screen>

  type AppScreenProps<
    Screen extends Exclude<
      keyof AppTabParamList | keyof AppStackParamList,
      'Root'
    >
  > = CompositeScreenProps<
    Screen extends keyof AppTabParamList
      ? BottomTabScreenProps<AppTabParamList, Screen>
      : NativeStackScreenProps<AppStackParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >

  namespace ReactNavigation {
    interface RootParamList
      extends AppStackParamList,
        AppTabParamList,
        AuthParamList {}
  }
}
