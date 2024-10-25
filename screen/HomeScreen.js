import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMenu } from '../redux/menuSlice'
import MenuList from '../components/home/MenuList'

const HomeScreen = () => {
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menu.menus);
  const status = useSelector((state) => state.menu.status);
  const error = useSelector((state) => state.menu.error);

  useEffect(() => {
    dispatch(fetchMenu())
  }, [dispatch])

  if(status === 'failed'){
    return <Text>Error: {error}</Text>
  }
  console.log(menus)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Warung Makan Bahari</Text>
        <Ionicons name='cart' size={24} color='#92400E' />
      </View>

      <MenuList menus={menus} />
    </SafeAreaView>
  )
}

export default HomeScreen

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: "#92400E",
  },
})