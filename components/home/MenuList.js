import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuList = ({ menus }) => {
  const [counts, setCounts] = useState({});

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
      } catch (error) {
        console.error("Error saving counts to AsyncStorage: ", error);
      }
    };
    saveCounts();

  }, [counts]);

  const increment = (menuId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [menuId]: (prevCounts[menuId] || 0) + 1,
    }));
  };

  const decrement = (menuId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [menuId]: Math.max(0, (prevCounts[menuId] || 0) - 1),
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

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
