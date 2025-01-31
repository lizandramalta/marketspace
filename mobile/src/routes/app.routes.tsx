import { Icon, IconColor } from '@components/Icon'
import { useToken } from '@gluestack-style/react'
import { useNavigatorOptions } from '@hooks/useNavigatorOptions'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  AdForm,
  AdDetails,
  AdPreview,
  Home,
  SignOut,
  UserAds
} from '@screens/index'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TabNavigator = createBottomTabNavigator<AppTabParamList>()
const StackNavigator = createNativeStackNavigator<AppStackParamList>()

function BottomTabNavigation() {
  const insets = useSafeAreaInsets()
  const tabBarBackgroundColor = useToken('colors', 'gray700')
  const { isShowingTabBar } = useNavigatorOptions()

  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: tabBarBackgroundColor,
          paddingTop: 20,
          paddingBottom: insets.bottom + 28,
          height: 72,
          display: isShowingTabBar ? 'flex' : 'none'
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'gray200' as IconColor,
        tabBarInactiveTintColor: 'gray400' as IconColor
      }}
    >
      <TabNavigator.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              as="House"
              weight={focused ? 'bold' : 'regular'}
              color={color as IconColor}
            />
          )
        }}
      />
      <TabNavigator.Screen
        name="UserAds"
        component={UserAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              as="Tag"
              weight={focused ? 'bold' : 'regular'}
              color={color as IconColor}
            />
          )
        }}
      />
      <TabNavigator.Screen
        name="SignOut"
        component={SignOut}
        options={{
          tabBarIcon: ({ color }) => <Icon as="SignOut" color="redLight" />
        }}
      />
    </TabNavigator.Navigator>
  )
}

function StackNavigation() {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Root" component={BottomTabNavigation} />
      <StackNavigator.Screen name="AdForm" component={AdForm} />
      <StackNavigator.Screen name="AdDetails" component={AdDetails} />
      <StackNavigator.Screen name="AdPreview" component={AdPreview} />
    </StackNavigator.Navigator>
  )
}

export const AppRoutes = StackNavigation
