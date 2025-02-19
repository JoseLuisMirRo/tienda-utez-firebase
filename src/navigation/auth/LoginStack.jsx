import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../../modules/auth/screens/Login'
import CreateAccount from '../../modules/auth/screens/CreateAccount'
const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false}}/>
    </Stack.Navigator>
  )
}