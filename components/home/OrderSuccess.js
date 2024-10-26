import { Dimensions, Image, Modal, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const OrderSuccess = ({ isVisible }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType='fade'
        >
            <StatusBar translucent barStyle={'light-content'} backgroundColor="rgba(0, 0, 0, 0.5)"/>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.successOrder}>
                        <Image
                            source={require('../../assets/orderSuccess.png')}
                            style={styles.imageSuccessOrder}
                        />
                        <Text style={styles.textSuccessOrder}>Successfully received your order. Processing your order...</Text>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default OrderSuccess

const { width, height } = Dimensions.get("window");

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
    imageSuccessOrder: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    textSuccessOrder: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 10,
        marginTop: 5,
        color: '#43A047'
    },
})