import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerById } from '../redux/customerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({navigation}) => {
  const { logout } = useAuth();

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.customer.customers);

  useEffect(() => {
    const loadCustomerData = async() => {
      try{
        const idCustomer = await AsyncStorage.getItem('idCustomer');
        if(idCustomer){
          dispatch(fetchCustomerById(JSON.parse(idCustomer)))
        }
      } catch(e){
        console.log("Failed to load customer data: ", e)
      }
    }
    loadCustomerData()
  }, [dispatch])

  const handleLogout = async() => {
    await logout()
    navigation.replace('Login')
  }
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Hi, {profile.name}!</Text>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
        <View style={styles.profileContainer}>
          <View style={styles.contentContainer}>
            <Ionicons name='person-circle' size={40} color='#92400E' />
            <Text style={styles.profileText}>{profile.name}</Text>
          </View>
          
          <View style={styles.contentContainer}>
            <Ionicons name='call' size={35} color='#92400E'/>
            <Text style={styles.profileText}>{profile.phoneNumber}</Text>
          </View>

          <View style={styles.contentContainer}>
            {profile.isMember ? (
              <>
                <Ionicons name='checkmark-circle' size={40} color='#92400E'/>
                <Text style={styles.profileStatusTextActive}>You're our member</Text>
              </>
            ) : (
              <>
                <Ionicons name='close-circle' size={40} color='red'/>
                <Text style={styles.profileStatusTextInactive}>You are not yet a member with us.</Text>
              </>
            )
            }
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
    paddingVertical: height * 0.02
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
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  profileText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#424242',
    marginLeft: 18,
    fontSize: 16,
    alignSelf: 'center'
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  profileStatusTextActive: {
    fontFamily: 'Poppins-SemiBold',
    color: '#424242',
    marginLeft: 18,
    fontSize: 16,
    alignSelf: 'center',
    flexShrink: 1,
  },
  profileStatusTextInactive: {
    fontFamily: 'Poppins-SemiBold',
    color: 'red',
    marginLeft: 18,
    fontSize: 16,
    alignSelf: 'center',
    flexShrink: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: "#92400E",
    marginBottom: 15
  },
})