import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";
// import { useAuth } from "../context/AuthContext";

const axiosInstance = axios.create({
    baseURL: 'http://192.168.82.202:8080/api/v1',
})

//untuk menangani tiap request
axiosInstance.interceptors.request.use(
    async(config) => {
        try{
            const token = await AsyncStorage.getItem('token');

            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch(error){
            return Promise.reject(error);
        }
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        if(error.response && error.response.status === 401){
            const navigation = useNavigation();
            Alert.alert("Error", "Invalid credentials")
            // const { logout } = useAuth();
            await AsyncStorage.removeItem('token');
            navigation.replace('Login');
        }

        return Promise.reject(error)
    }
)

export default axiosInstance;