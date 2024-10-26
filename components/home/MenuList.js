import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Buffer } from 'buffer';
import { Ionicons } from '@expo/vector-icons';
import CartList from './CartList';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction } from '../../redux/transactionSlice';
import { useNavigation } from '@react-navigation/native';
import OrderSuccess from './OrderSuccess';

const MenuList = ({ menus, tables }) => {
  const navigation = useNavigation();

  const [counts, setCounts] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const dispatch = useDispatch();
  const statusTransactions = useSelector((state) => state.transaction.status);
  // const [userId, setUserId] = useState('');

  // useEffect(() => {
  //   const getUserId = async() => {
  //     try{
  //       const token = await AsyncStorage.getItem('token')
  //       const parts = token.split('.').map(part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString())
  //       const payload = JSON.parse(parts[1]);
  //       setUserId(payload.sub)
  //     } catch(error){
  //       console.log(error)
  //     }
  //   }
  //   getUserId()
  // }, [])

//   const logAllAsyncStorage = async () => {
//     try {
//         // Mengambil semua kunci
//         const keys = await AsyncStorage.getAllKeys();

//         // Mengambil semua nilai yang sesuai dengan kunci
//         const values = await AsyncStorage.multiGet(keys);

//         // Mencetak semua kunci dan nilai ke konsol
//         values.forEach(([key, value]) => {
//             console.log(`Key: ${key}, Value: ${value}`);
//         });
//     } catch (error) {
//         console.error('Error fetching AsyncStorage:', error);
//     }
// };

// // Panggil fungsi ini di tempat yang sesuai, misalnya setelah login
// logAllAsyncStorage();



  useEffect(() => {
    const loadCounts = async () => {
      try {
        const savedCounts = await AsyncStorage.getItem('menuCounts');
        if (savedCounts) {
          setCounts(JSON.parse(savedCounts));
        }
      } catch (error) {
        console.error("Error loading counts from AsyncStorage: ", error);
      }
    };

    loadCounts();
  }, []);

  useEffect(() => {
    const saveCounts = async () => {
      try {
        await AsyncStorage.setItem('menuCounts', JSON.stringify(counts));
        const savedCounts = await AsyncStorage.getItem('menuCounts')
        // console.log(JSON.parse(savedCounts))

        // const customerId = await AsyncStorage.getItem('customerId')
        // console.log(JSON.parse(customerId))

      } catch (error) {
        console.error("Error saving counts to AsyncStorage: ", error);
      }
    };
    saveCounts();

  }, [counts]);

  useEffect(() => {
    if (isSuccessModalVisible) {
      const timer = setTimeout(() => {
        setIsSuccessModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessModalVisible]);

  const increment = (menuId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [menuId]: (prevCounts[menuId] || 0) + 1,
    }));
  };

  const decrement = (menuId) => {
    setCounts((prevCounts) => {
      const newCounts = {...prevCounts}
      if(newCounts[menuId] > 1){
        newCounts[menuId] -= 1;
      } else{
        delete newCounts[menuId];
      }
      return newCounts
    })
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const handleCartList = () => {
    setIsModalVisible(!isModalVisible)
  }

  const handleCheckout = async(data) => {
    try{
      await dispatch(createTransaction(data)).unwrap();
      AsyncStorage.removeItem('menuCounts').then(() => {
        // console.log('menuCounts removed');
        setCounts({});
        setIsModalVisible(false); 
        setIsSuccessModalVisible(true);
        // setTimeout(() => setIsSuccessModalVisible(false), 3000)
        // console.log('Counts after reset:', counts);
        // navigation.navigate('Main');
      });
    } catch(e){
        console.error('Error when saving order: ', e);
    }
  }
  
  const renderMenuItem = ({ item }) => {
    const count = counts[item.menuId] || 0;

    return (
      <View style={styles.container}>
        <Image 
          source={{ uri: item.image.url }}
          style={styles.images}
        />
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>{formatCurrency(item.price)}</Text>

        {count === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={() => increment(item.menuId)}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addOrSubtract}>
            <TouchableOpacity onPress={() => decrement(item.menuId)} style={styles.addOrSubtractButton}>
              <Text style={styles.addOrSubtractButtonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.counter}>{count}</Text>

            <TouchableOpacity onPress={() => increment(item.menuId)} style={styles.addOrSubtractButton}>
              <Text style={styles.addOrSubtractButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Warung Makan Bahari</Text>
        <Ionicons name='cart' size={24} color='#92400E' onPress={handleCartList} />
      </View>
      <FlatList
        data={menus}
        keyExtractor={(item) => item.menuId ? String(item.menuId) : String(Math.random())}
        renderItem={renderMenuItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessageText}>No Menus Found</Text>
          </View>
        }
      />
      {isModalVisible && (
        <CartList
          isVisible={isModalVisible}
          menus={menus}
          onClose={handleCartList}
          increment={increment}
          decrement={decrement}
          counts={counts}
          tables={tables}
          onCheckout={handleCheckout}
        />
      )}

      {isSuccessModalVisible && (
        <OrderSuccess
          isVisible={isSuccessModalVisible}
        />
      )}
    </>
  );
};

export default MenuList;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 15,
    flex: 1,
    marginLeft: 5,
    marginHorizontal: 10,
    width: (width / 2) - 20,
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
  row: {
    justifyContent: 'center',
  },
  images: {
    borderRadius: 10,
    width: '100%',
    height: (width / 2) - 40,
    marginBottom: 5
  },
  menuName: {
    paddingLeft: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#424242'
  },
  menuPrice: {
    paddingLeft: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#424242',
    marginBottom: 10,
    marginTop: -5
  },
  addButton: {
    borderRadius: 40,
    marginHorizontal: 10,
    height: height * 0.05,
    borderWidth: 2,
    borderColor: '#92400E',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#92400E',
    marginTop: 5
  },
  addOrSubtract: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  }
});
