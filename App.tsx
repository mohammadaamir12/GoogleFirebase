import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigator from './src/navigation/StackNavigator'
import { Provider } from 'react-redux'
import store from './src/redux/Store'
import Toast from 'react-native-toast-message';


const App = () => {
  return (
    <Provider store={store}>
    <StackNavigator/>
    <Toast/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})