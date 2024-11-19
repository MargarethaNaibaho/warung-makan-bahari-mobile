import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransaction, fetchTransactionByCustomerId } from '../../redux/transactionSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionList = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transaction.transactions);
    const statusTransactions = useSelector((state) => state.transaction.status);
    const errorTransactions = useSelector((state) => state.transaction.error);

    useEffect(() => {
        const getTransactions = async() => {
            try {
                const idCustomer = await AsyncStorage.getItem("idCustomer")
                console.log(idCustomer)
                if(!idCustomer){
                    console.error("Customer ID not found")
                    return;
                }

                dispatch(fetchTransactionByCustomerId(idCustomer));
                console.log("dapat nih")
                
            } catch(error){
                console.error("Failed to fetch transaction: ", error)
            }
            // dispatch(fetchTransaction())
        }
        getTransactions()
    }, [dispatch]);

    if (statusTransactions === 'failed') {
        return <Text>Error: {errorTransactions}</Text>;
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    const formatDate = (value) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return new Date(value).toLocaleString('en-US', options);
    };

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.transDate) - new Date(a.transDate))

    const RenderTransaction = memo(({ item }) => {
        const totalAmount = item.orderDetails.reduce((total, detail) => total + (detail.price * detail.quantity), 0);
        const formattedDate = formatDate(item.transDate);
        const formattedTotal = formatCurrency(totalAmount);

        return (
            <View style={styles.itemContainer}>
                <Text style={styles.date}>{formattedDate}</Text>
                <Text style={styles.table}>Dine in / take away: {item.tableName}</Text>
                <Text style={styles.items}>Items: </Text>
                <View style={styles.detailItem}>
                    {item.orderDetails.map((detail) => (
                        <View key={detail.orderDetailId} style={styles.quantityNamePriceContainer}>
                            <Text style={styles.qnp}>{detail.quantity} {detail.menuName}</Text>
                            <Text style={styles.qnp}>{formatCurrency(detail.price * detail.quantity)}</Text>
                        </View>
                    ))}
                    <View style={styles.total}>
                        <Text style={styles.totalDetail}>Total: </Text>
                        <Text style={styles.totalDetail}>{formattedTotal}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>
            </View>
        );   
    });

    return (
        <View style={styles.container}>
            {transactions 
            ? <FlatList
                data={sortedTransactions}
                renderItem={({item}) => <RenderTransaction item={item}/>}
                keyExtractor={(item) => item.orderId.toString()}
            />
            : <Text>No data found</Text> 
            }
        </View>
    );
};

export default TransactionList;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    line: {
        height: 1,
        backgroundColor: '#d3d3d3',
        width: '100%',
        marginTop: 25,
        marginBottom: 25,
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.02
    },
    date: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        paddingHorizontal: width * 0.05,
    },
    table: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        paddingHorizontal: width * 0.05,
    },
    detailItem: {
        backgroundColor: '#f7f7f7',
        paddingVertical: 10,
        flex: 1,
    },
    items: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        paddingHorizontal: width * 0.05,
    },
    quantityNamePriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.05,
    },
    qnp: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#484848'
    },
    total: {
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    totalDetail: {
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
        color: '#484848'
    }
});
