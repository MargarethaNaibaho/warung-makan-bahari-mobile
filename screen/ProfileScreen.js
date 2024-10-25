import { StatusBar, StyleSheet, Text, View } from 'react-native'
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
    <SafeAreaView style={{
        paddingTop: 30,
        paddingHorizontal: 25,
        backgroundColor: '#1E1E2D',
        flex: 1 //ini supaya bisa keseluruhan layar punya warna black
    }}>
        <StatusBar style="auto" />
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

const styles = StyleSheet.create({
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