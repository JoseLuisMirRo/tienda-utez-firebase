import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Button } from 'react-native-paper'
import { getAuth } from "firebase/auth";


const Home = () => {
    const auth = getAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <Button mode="contained" style={styles.button} onPress={() => {auth.signOut()}}>Cerrar Sesión</Button>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
    },
    button: {
        marginTop: 16,
    }
})