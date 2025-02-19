import React, { useState } from 'react';
import { Avatar, Button, Card, Text, TextInput} from 'react-native-paper';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { isEmpty } from 'lodash';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({email: '', password: ''}); 
    const [showPassword, setShowPassword] = useState();

    const handleLogin = () => {
        if(isEmpty(email) || isEmpty(password)){
            setError({
                email: isEmpty(email) ? 'El email es requerido' : '',
                password: isEmpty(password) ? 'La contraseña es requerida' : ''
            });
        }else{
            setError({email: '', password: ''});
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert(`Bienvenido ${user.email}`);
            })
            .catch((error) => {
                console.log(error);

                let errorMessage = "Ocurrió un error inesperado.";

                // Manejo de errores de Firebase
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = "El email ingresado no es válido.";
                        setError((prev) => ({ ...prev, email: errorMessage }));
                        break;
                    case 'auth/user-not-found':
                        errorMessage = "No hay ninguna cuenta registrada con este email.";
                        setError((prev) => ({ ...prev, email: errorMessage }));
                        break;
                    case 'auth/wrong-password':
                        errorMessage = "La contraseña ingresada es incorrecta.";
                        setError((prev) => ({ ...prev, password: errorMessage }));
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = "Demasiados intentos fallidos. Intenta más tarde.";
                        break;
                    default:
                        errorMessage = "Error al iniciar sesión. Inténtalo de nuevo.";
                        break;
                }
    
                Alert.alert(
                    "Error de inicio de sesión",
                    errorMessage,
                    [{ text: "OK" }]
                );
        });
        }
    }

    return (
    <View style={styles.container}>
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
                <Button mode="contained" style={styles.button} labelStyle={{color: '#FFFFFF', fontWeight: 'bold'}} onPress={handleLogin}>Iniciar Sesión</Button>
                <Button mode="text" style={styles.link} labelStyle={{color: '#FFFFFF', fontWeight: 'bold'}}onPress={() => navigation.navigate('CreateAccount')}>Crear cuenta</Button>
            </Card.Content>
        </Card>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF', // Fondo blanco
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
        padding: 16,
        backgroundColor: '#002E60', // Azul UTEZ
        borderRadius: 10,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#ffffff', // Blanco para contraste
        borderRadius: 5,
    },
    button: {
        marginBottom: 16,
        backgroundColor: '#009475', // Verde UTEZ
        paddingVertical: 8,
        borderRadius: 5,
    },
    text: {
        color: '#FFFFFF', // Texto del botón en blanco
        fontWeight: 'bold',
    },
    link: {
        color: '#FFFFFF', // Blanco para asegurar visibilidad
        textAlign: 'center',
        fontSize: 14,
        textDecorationLine: 'none', // Eliminar subrayado
    },
    text: {
        color: '#ffffff', // Texto en blanco para contraste
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Login;