import { View, Text } from 'react-native'
import React from 'react'
import InputText from '../components/InputText'
import colors from '../utils/Color'
import Button from '../components/Button'
import auth, { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
// import firebase from '@react-native-firebase/app';

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     // Your firebase configuration object
//     apiKey: "AIzaSyBWZagI7Kq1zS8nT4bm7Bc5-frAlfF9twY",
//     projectId: "demo1-9f6d5",
//     storageBucket: "demo1-9f6d5.appspot.com",
//     messagingSenderId: "Y1054616825937",
//     appId: "1:1054616825937:android:7e98574531f453796bc870"
//   });
// } else {
//   firebase.app(); // if already initialized, use that one
// }

const Register = () => {
    const regi=()=>{
        auth().createUserWithEmailAndPassword('doe@gmail.com', 'Password!')
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
        
            console.error(error);
          }); 
        console.log('hello');
        
    }
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text
                style={{ fontSize: 24, fontWeight: '600', color: colors.primary, marginBottom: '10%' }}
            >FireBase
            </Text>
            <InputText placeholder='Enter Your Email' />
            <InputText placeholder='Enter Your Password'
                customStyle={{ marginTop: 10, marginBottom: 15 }}
            />
            <Button customStyle={{}} text='Register' onpress={regi}/>
        </View>
    )
}

export default Register