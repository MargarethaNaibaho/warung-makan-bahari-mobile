import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';

const ProfileScreen = ({navigation}) => {
  const { logout } = useAuth();
  const handleLogout = async() => {
    await logout()
    navigation.replace('Login')
  }
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
        <View
            style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 15,
                flexDirection: 'row'
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'left',
                    flexShrink: 0,
                    justifyContent: 'flex-start'
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Poppins-SemiBold',
                    }}
                >
                    Margaretha Gok Asi Naibaho
                </Text>
            </View>

        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text title="Logout" style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        
    </SafeAreaView>
  )
}

export default ProfileScreen

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'red',
    marginTop: 10,
    borderRadius: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
})