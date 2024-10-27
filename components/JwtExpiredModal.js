import { Dimensions, Image, Modal, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const JwtExpiredModal = ({ isVisible }) => {
    const { logout } = useAuth();

    //karna si jwtexpiredmodal inidiluar navtioagtioncontainer, navigation ga sediakan .replace
    //jadi kita ganti dengan .reset
    const navigation = useNavigation();

    const handleLogout = async() => {
        try{
            await logout()
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        } catch (e){
            console.error('Hmm, something is wrong! Error: ', e)
        }
    }

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType='fade'
        >
            <StatusBar translucent barStyle={'light-content'} backgroundColor="rgba(0, 0, 0, 0.5)"/>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View>
                        <Image
                            source={require('../assets/authenticationExpired.png')}
                            style={styles.imageAuthenticationExpired}
                        />
                        <Text style={styles.textAuthenticationExpired}>Your session has ended. Please login to continue</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogout}
                    >
                        <Text title="Login" style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default JwtExpiredModal

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'left',
        maxHeight: height
    },
    imageAuthenticationExpired: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    textAuthenticationExpired: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 10,
        marginTop: 5,
        color: 'red'
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#451A03',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
})