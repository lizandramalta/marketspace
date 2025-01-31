import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProductCreateDTO, ProductDTO, ProductImage } from '../dtos/ProductDTO'
import { AdFormDataProps } from '@screens/AdForm'

export declare global {
  type AuthParamList = {
    SignIn: undefined
    SingUp: undefined
  }

  type AppTabParamList = {
    Home: undefined
    UserAds: undefined
    SignOut: undefined
  }

  type AppStackParamList = {
    AdForm: {
      action?: 'create' | 'edit'
      formData?: ProductDTO
    }
    AdDetails: {
      productId: string
      isUserAd?: boolean
    }
    AdPreview: {
      product: ProductCreateDTO | ProductDTO
      deletedImages?: ProductImage[]
    }
    Root: {
      screen: keyof AppTabParamList
    }
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
