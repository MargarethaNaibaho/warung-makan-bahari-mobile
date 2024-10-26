import { Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({navigation}) => {
    const { register } = useAuth();
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
    const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formErrors, setFormErrors] = useState('');

    const validate = () => {
        const regex = /^08\d*$/;
        let formErr = {};

        if(!username){
            formErr.username = "Username is required. ";
        }

        if(!name){
            formErr.name = "Name is required. ";
        }

        if(!password){
            formErr.password = "Password is required. ";
        } else if(password.length < 6){
            formErr.password = "6 min length character. "
        }

        if(!phoneNumber){
            formErr.phoneNumber = "Phone number is required. ";
        } else if (!regex.test(phoneNumber)) {
            formErr.phoneNumber = "Invalid phone number format. ";
        } else if(phoneNumber.length < 11) {
            formErr.phoneNumber = "11 min length character. "
        } else if(phoneNumber.length > 15) {
            formErr.phoneNumer = "15 max length character. "
        }

        setFormErrors(formErr)
        return Object.keys(formErr).length === 0
    }

    const handleRegister = async() => {
        if(!validate()) return;

        try{
            await register(username, password, name, phoneNumber);
            setSuccessMessage('Registrastration successful! Redirecting to login...');
            setErrorMessage('')
            setFormErrors({})
            setTimeout(() => navigation.navigate('Login'), 2000)
        } catch (error){
            setErrorMessage(error.message)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
            <Image source={require('../assets/logo.png')} style={styles.image} />

            <Text style={styles.title2}>Warung Makan Bahari</Text>

            <Text style={styles.title}>Register</Text>

            <Text style={styles.inputTitle}>Username</Text>
            <TextInput
                style={[styles.input, { borderColor: usernameFocused ? '#A16207' : '#ccc' }]}
                placeholder="Username"
                autoCapitalize="none"
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
                value={username}
                onChangeText={setUsername}
            />
            {formErrors.username &&  <Text style={styles.errorText}>{formErrors.username}</Text>}

            <Text style={styles.inputTitle}>Password</Text>
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
            {formErrors.password &&  <Text style={styles.errorText}>{formErrors.password}</Text>}

            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
                style={[styles.input, { borderColor: nameFocused ? '#A16207' : '#ccc' }]}
                placeholder="Nama"
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                value={name}
                onChangeText={setName}
            />
            {formErrors.name &&  <Text style={styles.errorText}>{formErrors.name}</Text>}

            <Text style={styles.inputTitle}>Phone Number</Text>
            <TextInput
                style={[styles.input, { borderColor: phoneNumberFocused ? '#A16207' : '#ccc' }]}
                placeholder="Nomor HP"
                onFocus={() => setPhoneNumberFocused(true)}
                onBlur={() => setPhoneNumberFocused(false)}
                value={phoneNumber}
                keyboardType='phone-pad'
                onChangeText={setPhoneNumber}
            />
            {formErrors.phoneNumber &&  <Text style={styles.errorText}>{formErrors.phoneNumber}</Text>}

            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.toLogin}>
                <Text style={styles.toLoginText}>Sudah punya akun?</Text>
                <Text style={styles.toLoginButton} onPress={() => navigation.navigate('Login')}> Login di sini</Text>
            </View>

            {errorMessage && 
            <View style={styles.invalidAlert}>
                <Text style={styles.invalidAlertText}>{errorMessage}</Text>
            </View>
            }

            {successMessage && 
            <View style={styles.successAlert}>
                <Text style={styles.successAlertText}>{successMessage}</Text>
            </View>
            }
        </SafeAreaView>
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
        marginBottom: 5,
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
    },
    invalidAlert: {
        backgroundColor: '#ffcdd2',
        paddingHorizontal: width * 0.05,
        minHeight: height * 0.05,
        maxHeight: 500,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#d32f2f',
        borderRadius: 4,
        marginTop: 12,
    },
    invalidAlertText: {
        color: '#d32f2f',
        fontFamily: 'Poppins-Regular'
    },
    successAlert: {
        backgroundColor: '#c8e6c9',
        paddingHorizontal: width * 0.05,
        minHeight: height * 0.05,
        maxHeight: 500,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#43a047',
        borderRadius: 4,
        marginTop: 12,
    },
    successAlertText: {
        color: '#43a047',
        fontFamily: 'Poppins-Regular'
    },
    errorText: {
        color: '#d32f2f',
        marginBottom: 12,
        marginLeft: 4,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
    },
    inputTitle: {
        marginBottom: 0,
        marginTop: 12,
        marginLeft: 4,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
    },
})
