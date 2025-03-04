import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Navigation from '../Navigation'

const Stack = createStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Navigation" component={Navigation} options={{ headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default AppStack

