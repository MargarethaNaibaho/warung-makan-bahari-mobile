import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({navigation}) => {
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
    const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleRegister = () => {
        navigation.navigate('Login');
    }
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.image} />

            <Text style={styles.title2}>Warung Makan Bahari</Text>

            <Text style={styles.title}>Register</Text>

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

            <TextInput
                style={[styles.input, { borderColor: nameFocused ? '#A16207' : '#ccc' }]}
                placeholder="Nama"
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={[styles.input, { borderColor: phoneNumberFocused ? '#A16207' : '#ccc' }]}
                placeholder="Nomor HP"
                onFocus={() => setPhoneNumberFocused(true)}
                onBlur={() => setPhoneNumberFocused(false)}
                value={phoneNumber}
                keyboardType='phone-pad'
                onChangeText={setPhoneNumber}
            />

            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.toLogin}>
                <Text style={styles.toLoginText}>Sudah punya akun?</Text>
                <Text style={styles.toLoginButton} onPress={() => navigation.navigate('Login')}> Login di sini</Text>
            </View>
        </View>
    )
}

export default RegisterScreen

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
    toLogin: {
        flexDirection: 'row',
        fontSize: 14,
        marginTop: 10,
        justifyContent: 'center'
    },
    toLoginText: {
        fontFamily: 'Poppins-Regular',
    },
    toLoginButton: {
        fontFamily: 'Poppins-Bold',
        marginLeft: 5,
        color: '#451A03'
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative', 
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: -20
    }
})
