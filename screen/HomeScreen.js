import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMenu } from '../redux/menuSlice'
import MenuList from '../components/home/MenuList'
import { fetchTable } from '../redux/tableSlice'

const HomeScreen = () => {
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menu.menus);
  const statusMenus = useSelector((state) => state.menu.status);
  const errorMenus = useSelector((state) => state.menu.error);

  const tables = useSelector((state) => state.table.tables);
  const statusTables = useSelector((state) => state.table.status);
  const errorTables = useSelector((state) => state.table.error);

  useEffect(() => {
    dispatch(fetchMenu())
    dispatch(fetchTable())
  }, [dispatch])

  if(statusMenus === 'failed'){
    return <Text>Error: {errorMenus}</Text>
  }

  if(statusTables === 'failed'){
    return <Text>Error: {errorTables}</Text>
  }
  // console.log(menus)

  return (
    <SafeAreaView style={styles.container}>
      <MenuList menus={menus} tables={tables}/>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
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
})