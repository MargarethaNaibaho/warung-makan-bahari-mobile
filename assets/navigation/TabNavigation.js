import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import TransactionScreen from '../../screen/TransactionScreen';
import ProfileScreen from '../../screen/ProfileScreen';
import HomeScreen from '../../screen/HomeScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if(route.name === "Home"){
                    iconName = focused ? "restaurant" : "restaurant-outline";
                } else if(route.name === "Transaction"){
                    iconName = focused ? "fast-food" : "fast-food-outline" ;
                } else if(route.name === "Profile"){
                    iconName = focused ? "person" : "person-outline";
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: '#92400E',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                fontFamily: 'Poppins-Light',
                height:70,
                paddingBottom: 10
            },
            headerShown: false,
        })}
    >
        <Tab.Screen name={"Home"} component={HomeScreen} />
        <Tab.Screen name={"Transaction"} component={TransactionScreen} />
        <Tab.Screen name={"Profile"} component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigation