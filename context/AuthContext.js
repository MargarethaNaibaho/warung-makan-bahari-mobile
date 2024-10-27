import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload.user
            }
        case 'REGISTER':
            return {
                ...state,
                isLoggedIn: null,
                token: null,
                user: action.payload.user
            }
        case 'LOGOUT':
            return{
                ...state,
                isLoggedIn: false,
                token: null,
                user: null
            }
        default:
            return state
    }
}

export const AuthProvider = (({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        isLoggedIn: false,
        token: null,
        user: null,
    })

    const [isVisible, setIsVisible] = useState(false);

    const login = async(username, password) => {
        try{
            const response = await axiosInstance.post('/auth/login', {username, password})
            const {data} = response.data;

            if(data){
                const { token, customerId, role} = data;
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('idCustomer', JSON.stringify(data.customerId));
                // console.log(customerId)
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        token: data.token,
                        user: data.role,
                    }
                })
                return customerId;

            } else{
                throw new Error('Login failed: No Token Received')
            }
        } catch(e){
            console.log('Invalid username or password')
        }
    }

    const register = async(username, password, name, phoneNumber) => {
        try{
            const response = await axiosInstance.post('/auth/register', {username, password, name, phoneNumber})
            const {data, message} = response.data;

            if(data){
                dispatch({
                    type: 'REGISTER',
                    payload: {
                        user: data.username
                    }
                })
            } else{
                throw new Error(`Register failed: ${message}`)
            }
        } catch(e) {
            throw new Error(e.response?.data?.message || 'User already exists')
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('menuCounts')
        await AsyncStorage.removeItem('customerId');
        setIsVisible(false)
        // console.log(AsyncStorage.getItem('token'))
        dispatch({type: 'LOGOUT'})
    }

    const checkTokenExpiration = async() => {
        const token = await AsyncStorage.getItem('token')
        if(token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if(decodedToken.exp < currentTime) {
                setIsVisible(true);
                dispatch({type: 'LOGOUT'})
            }
        }
    }

    useEffect(() => {
        const checkToken = async() => {
            const token = await AsyncStorage.getItem('token');
            if(token){
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        token,
                        user: null
                    }
                })
            }
        }
        checkToken();
        const interval  = setInterval(checkTokenExpiration, 30000)
        return () => clearInterval(interval)
    }, [])

    const value = {
        ...authState,
        login,
        logout,
        register,
        isVisible,
        setIsVisible
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
})