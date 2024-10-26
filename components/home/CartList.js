import { Dimensions, FlatList, Image, Modal, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Buffer } from 'buffer'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CartList = ({isVisible, menus, onClose, onCheckout, increment, decrement, counts, tables}) => {
  const [table, setTable] = useState('');
  const [custId, setCustId] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const calculateTotal = () => {
    return menus.reduce((total, item) => {
      const count = counts[item.menuId] || 0;
      return total + (item.price * count)
    }, 0)
  }

  useEffect(() => {
    const getCustomerId = async () => {
      try {
        const idCustomer = await AsyncStorage.getItem('idCustomer');
        if(idCustomer){
          const cleanedId = idCustomer.replace(/"/g, '');
          setCustId(cleanedId)
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCustomerId();
  }, []);

  useEffect(() => {
    setTable(tables[0].id);
  }, [tables])

  const generateCartData = () => {
    if (!custId) {
      console.error('Customer ID not set');
      return;
    }
    const checkoutMenu = menus.map((item) => {
      const count = counts[item.menuId] || 0;
      return {
        menuId: item.menuId,
        quantity: count,
      };
    }).filter(item => item.quantity > 0);

    const jsonString = JSON.stringify({
      customerId: custId,
      tableId: table,
      orderDetails: checkoutMenu
    })

    // console.log('Checkout json: ', jsonString);
    return jsonString;
  }

  const handleCheckout = () => { 
    const data = generateCartData();
    onCheckout(data);
  }

  const renderItem = ({ item }) => {
    const count = counts[item.menuId] || 0
    if(count > 0) {
      return (
        <>
          <View key={item.menuId} style={styles.menuDetailCard}>
            <Image
              source={{ uri: item.image.url }}
              style={styles.images}
            />
            <View style={styles.priceNameButton}>
              <Text style={styles.menuName}>{item.name}</Text>

              <Text style={styles.menuPrice}>{formatCurrency(item.price)}</Text>

              <View style={styles.addOrSubtract}>
                <TouchableOpacity onPress={() => decrement(item.menuId)} style={styles.addOrSubtractButton}>
                  <Text style={styles.addOrSubtractButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.counter}>{count}</Text>

                <TouchableOpacity onPress={() => increment(item.menuId)} style={styles.addOrSubtractButton}>
                  <Text style={styles.addOrSubtractButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.line}></View>
        </>
      )
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
            <View style={styles.headerContainer}>
              <Ionicons  name='arrow-back' size={24} color='#92400E' onPress={onClose}/>
              <Text style={styles.title}>Cart Detail</Text>
            </View>
            <View style={styles.line}></View>

            {Object.keys(counts).length !== 0 ? (
              <>
                <FlatList
                  data={menus}
                  keyExtractor={(item) => item.menuId ? String(item.menuId) : String(Math.random())}
                  renderItem={renderItem}
                  ListEmptyComponent={
                    <View style={styles.emptyMessageContainer}>
                      <Text style={styles.emptyMessageText}>No Menus Found</Text>
                    </View>
                  }
                />

                <View style={styles.wantToCheckout}>
                  <Text style={styles.totalText}>Total: {formatCurrency(calculateTotal())}</Text>

                  <View style={styles.tableContainer}>
                    <Text style={styles.totalText}>Pilihan Meja: </Text>

                    <Picker
                      style={styles.picker}
                      selectedValue={table}
                      onValueChange={(itemValue) => setTable(itemValue)}
                    >
                      {tables.map((table) => (
                        <Picker.Item key={table.id} label={table.name} value={table.id} />
                      ))}
                    </Picker>
                  </View>

                  <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={handleCheckout}
                  >
                    <Text title="Checkout" style={styles.checkoutButtonText}>Checkout</Text>
                  </TouchableOpacity>
                  {/* <Text>{generateCartData()}</Text> */}
                </View>
              </>
            ) : (
              <View style={styles.emptyCart}>
                <Image 
                  source={require('../../assets/emptyCart.png')}
                  style={styles.imageEmptyCart}
                />
                <Text style={styles.emptyCartText}>Your Cart Is Empty :(</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
  )
}

export default CartList

const {width, height} = Dimensions.get("window");

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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
    marginTop: 5
  },
  line:{
    height: 1,
    backgroundColor: '#d3d3d3',
    width: '100%',
    marginVertical: 10
  },
  menuDetailCard: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  images: {
    borderRadius: 10,
    width: (width / 2) - 80,
    height: (width / 2) - 80,
    marginBottom: 5
  },
  priceNameButton: {
    alignSelf: 'left',
    maxWidth: (width / 2) ,
    alignItems: 'flex-end'
  },
  menuName: {
    paddingLeft: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'left',
    color: '#424242',
  },
  menuPrice: {
    paddingLeft: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#424242',
    marginBottom: 10,
    textAlign: 'left',
    marginTop: -5,
  },
  addOrSubtract: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: -10
  },
  addOrSubtractButton: {
    borderRadius: 40,
    marginHorizontal: 10,
    height: height * 0.05,
    width: height * 0.05,
    borderWidth: 2,
    borderColor: '#92400E',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-SemiBold',
    maxWidth: (width / 2) - 20, 
  },
  addOrSubtractButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#92400E',
    marginBottom: -5
  },
  counter: {
    fontFamily: 'Poppins-SemiBold',
    color: '#92400E',
    marginBottom: -5
  },
  totalText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
    marginTop: 5,
    color: '#92400E'
  },
  tableContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    marginTop: -10,
    width: '100%',
  },
  checkoutButton: {
    backgroundColor: '#43A047',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center'
  },
  checkoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  imageEmptyCart: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
    marginTop: 5,
    color: '#92400E'
  },
})