import { Alert, Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
    const { login, isLoggedIn } = useAuth();
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        if(isLoggedIn) {
            navigation.replace('Main')
        }
    }, [isLoggedIn])

    const handleLogin = async(e) => {
        if(!username || !password){
            Alert.alert('Error', 'Email and password is required')
            return;
        }

        try{
            const success = await login(username, password)
            if(success){
                navigation.replace('Main')
            }  else{
                setErrorMessage('Invalid username or password')
            }
        } catch(error) {
            setErrorMessage('Invalid username or password')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
            <Image source={require('../assets/logo.png')} style={styles.image} />

            <Text style={styles.title2}>Warung Makan Bahari</Text>

            <Text style={styles.title}>Login</Text>
            <TextInput
                style={[styles.input, { borderColor: usernameFocused ? '#A16207' : '#ccc' }]}
                placeholder="Username"
                autoCapitalize="none"
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
                value={username}
                onChangeText={setUsername}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, { borderColor: passwordFocused ? '#A16207' : '#ccc' }]}
                    placeholder="Password"
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    value={password}
                    onChangeText={setPassword}
                    paddingRight={40} 
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Ionicons
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color="#451A03"
                        style={styles.eyeIcon} 
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.toRegister}>
                <Text style={styles.toRegisterText}>Don't have an account?</Text>
                <Text style={styles.toRegisterButton} onPress={() => navigation.navigate('Register')}> Register here</Text>
            </View>

            {errorMessage && 
            <View style={styles.invalidAlert}>
                <Text style={styles.invalidAlertText}>{errorMessage}</Text>
            </View>
            }
        </SafeAreaView>
    )
}

export default LoginScreen

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: width * 0.05,
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 25,
        marginBottom: 10,
        textAlign: 'center'
    },
    title2: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: "#92400E",
        textAlign: 'center',
        marginBottom: 10
    },
    input: {
        height: height * 0.05,
        width: width - (width * 0.1),
        marginBottom: 12,
        borderWidth: 1,
        paddingLeft: 8,
        borderRadius: 4,
        fontFamily: 'Poppins-Light',
        paddingRight: 40
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#451A03',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    toRegister: {
        flexDirection: 'row',
        fontSize: 14,
        marginTop: 10,
        justifyContent: 'center'
    },
    toRegisterText: {
        fontFamily: 'Poppins-Regular',
    },
    toRegisterButton: {
        fontFamily: 'Poppins-Bold',
        marginLeft: 5,
        color: '#451A03'
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative', 
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: -20
    },
    invalidAlert: {
        backgroundColor: '#ffcdd2',
        paddingHorizontal: width * 0.05,
        height: height * 0.05,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#d32f2f',
        borderRadius: 4,
        marginTop: 12
    },
    invalidAlertText: {
        color: '#d32f2f'
    },
})
