import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TransactionList from '../components/transaction/TransactionList'

const TransactionScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
      <Text style={styles.title}>Your History Transaction</Text>
      <TransactionList />
    </SafeAreaView>
  )
}

export default TransactionScreen

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: "#92400E",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02
  },

})