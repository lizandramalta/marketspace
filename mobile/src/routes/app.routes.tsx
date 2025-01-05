import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  AdCreate,
  Home,
  UserAds,
  SignOut,
  AdDetails,
  AdPreview
} from '@screens/index'

const TabNavigator = createBottomTabNavigator<AppTabParamList>()
const StackNavigator = createNativeStackNavigator<AppStackParamList>()

function BottomTabNavigation() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="Home" component={Home} />
      <TabNavigator.Screen name="UserAds" component={UserAds} />
      <TabNavigator.Screen name="SignOut" component={SignOut} />
    </TabNavigator.Navigator>
  )
}

function StackNavigation() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Root" component={BottomTabNavigation} />
      <StackNavigator.Screen name="AdCreate" component={AdCreate} />
      <StackNavigator.Screen name="AdDetails" component={AdDetails} />
      <StackNavigator.Screen name="AdPreview" component={AdPreview} />
    </StackNavigator.Navigator>
  )
}

export const AppRoutes = StackNavigation
