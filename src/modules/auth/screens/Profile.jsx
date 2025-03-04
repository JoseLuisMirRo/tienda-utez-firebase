import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { getAuth } from '@firebase/auth'
import AvatarProfile from '../components/AvatarProfile';
import ProfileCard from '../components/ProfileCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Title } from 'react-native-paper';

export default function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <AvatarProfile user={user} styles={styles.avatar} />
      <ProfileCard title="Nombre" value={user.name||"No disponible"} />
      <ProfileCard title="Email" value={user.email||"No disponible"} />
      <Button mode="contained" onPress={() => {auth.signOut()}}>Cerrar Sesión</Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white" 
},
title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
},
avatar: {
  marginBottom: 10
}
})