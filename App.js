import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screen/LoginScreen';
import TabNavigation from './assets/navigation/TabNavigation';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import RegisterScreen from './screen/RegisterScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Provider } from 'react-redux';
import store from './store';
import JwtExpiredModal from './components/JwtExpiredModal';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("./assets//fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if(error) throw error;

    if(fontsLoaded) {
      console.log('Fonts are successfully loaded')
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <Provider store={store}>
        <MainApp />
      </Provider>
    </AuthProvider>
  );
}

function MainApp() {
  const { isVisible } = useAuth()

  return (
    <NavigationContainer>
      <JwtExpiredModal isVisible={isVisible}/>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen 
          name='Login'
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name='Register'
          component={RegisterScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='Main'
          component={TabNavigation}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
