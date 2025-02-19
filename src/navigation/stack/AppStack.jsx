import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../../modules/home/screens/Home'

const Stack = createStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default AppStack

