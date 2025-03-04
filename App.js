
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from './src/navigation/stack/auth/LoginStack';
import AppStack from './src/navigation/stack/AppStack';
import { useEffect, useState } from 'react';
import { app, auth, db, storage } from './src/config/util/firebaseConnection';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      setLoader(false);
    });
  },[]);

  if (loader) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }else{
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          {isLogged ? <AppStack /> : <LoginStack />}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
