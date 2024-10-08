import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Register from '../screens/Register';
import Login from '../screens/Login';
import {useSelector} from 'react-redux'
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const userid=useSelector(state=>state.user.userId)
    console.log(userid);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Home'>
                <Stack.Screen name="Register" component={Register} />
                < Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator