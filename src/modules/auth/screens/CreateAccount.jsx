import { StyleSheet, View, Image, Alert } from 'react-native'
import { Avatar, Button, Card, Text, TextInput, IconButton} from 'react-native-paper';
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { isEmpty } from 'lodash';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccount = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState({email: '', password: ''});
    const [showPassword, setShowPassword] = useState();

    const handleCreateAccount = () => {
        if(isEmpty(email) || isEmpty(password) || isEmpty(repeatPassword)){
            setError({
                email: isEmpty(email) ? 'El email es requerido' : '',
                password: isEmpty(password) ? 'La contraseña es requerida' : '',
                repeatPassword: isEmpty(repeatPassword) ? 'La contraseña es requerida' : ''
            });
        }else{
            setError({email: '', password: ''});
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigation.goBack();
            })
            .catch((error) => {
                console.log(error);

                if (error.code === 'auth/email-already-in-use') {
                    setError((prev) => ({ ...prev, email: 'El email ya está en uso' }));
                    Alert.alert('Error', 'El email ya está en uso');
                } else if (error.code === 'auth/invalid-email') {
                    setError((prev) => ({ ...prev, email: 'Email inválido' }));
                    Alert.alert('Error', 'Email inválido');
                } else if (error.code === 'auth/weak-password') {
                    setError((prev) => ({ ...prev, password: 'La contraseña es muy débil' }));
                    Alert.alert('Error', 'La contraseña es muy débil');
                } else {
                    setError((prev) => ({ ...prev, email: 'Error al crear cuenta' }));
                    Alert.alert('Error', 'Error al crear cuenta');
                }
            }
            );
        }
    }
  return (
<SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
    </View>
        <Card style={styles.card}>
            <Card.Content>
            <View style={styles.logoContainer}>
                <Image 
                    source={{ uri: 'https://www.utez.edu.mx:8443/SISAVA/img/utez/utez-blanco.png' }} 
                    style={styles.logo} 
                    resizeMode="contain" 
                />
                <Text style={styles.text}>Tienda UTEZ</Text>
            </View>
                <Text variant="titleMedium" style={styles.text}>Usuario</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text variant="titleMedium" style={styles.text}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Text variant="titleMedium" style={styles.text}>Repetir Contraseña</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                />
                <Button mode="contained" style={styles.button} labelStyle={styles.text} onPress={handleCreateAccount}>Crear Cuenta</Button>
            </Card.Content>
        </Card>
    </SafeAreaView>
  )
}

export default CreateAccount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#FFFFFF', // Fondo blanco
    },
    header: {
        width: '100%',
        alignItems: 'flex-start',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: {
        width: 100,
        height: 100,
    },
    card: {
        width: '100%',
        maxWidth: 350,
        minHeight: 300,
        padding: 16,
        backgroundColor: '#002E60', // Azul UTEZ
        borderRadius: 10, // Bordes más suaves
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#FFFFFF', // Blanco para contraste
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        marginBottom: 16,
        backgroundColor: '#009475', // Verde UTEZ
        paddingVertical: 10,
        borderRadius: 5,
    },
    text: {
        color: '#FFFFFF', // Texto del botón en blanco
        fontWeight: 'bold',
    },
    link: {
        color: '#FFFFFF', // Enlaces en blanco para mejor visibilidad
        textAlign: 'center',
        fontSize: 14,
        textDecorationLine: 'none', // Eliminar subrayado
    }
});