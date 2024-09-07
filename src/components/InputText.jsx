import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const InputText = ({placeholder,customStyle,value,setValue,errorMessage,max,secure}) => {
  return (
    <View style={{width:'85%'}}>
        <TextInput 
        style={[styles.textInput,customStyle]}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        value={value}
        maxLength={max}
        onChangeText={setValue} 
        secureTextEntry={secure=='true'?true:false}
        />
         {errorMessage ? <Text style={{ color: 'red', marginTop: 5 }}>{errorMessage}</Text> : null}
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