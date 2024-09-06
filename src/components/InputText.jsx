import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const InputText = ({placeholder,customStyle,value,setValue}) => {
  return (
    <View style={{width:'85%'}}>
        <TextInput 
        style={[styles.textInput,customStyle]}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        value={value}
        onChangeText={setValue} 
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '85%',
    },
    textInput: {
      borderColor: 'grey',
      borderWidth: 1,
      width: '100%',
      borderRadius: 8,
      paddingStart: 10,
    },
  });

export default InputText