import { View, Text,TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import colors from '../utils/Color'

const Button = ({text,customStyle,onpress}) => {
  return (
    <View style={{width:'85%'}}>
      <TouchableOpacity style={[styles.button,customStyle]}
      onPress={onpress}
      >
        <Text style={styles.textInput}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
    button:{
     backgroundColor:colors.primary,
     elevation:2,
     borderRadius:8,
     paddingVertical:13,
     alignItems:'center'
    },
    textInput:{
      fontSize:14,
      fontWeight:'500',
      color:colors.black
    }
})

export default Button