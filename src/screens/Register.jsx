import { View, Text } from 'react-native'
import React, { useState,useLayoutEffect } from 'react'
import InputText from '../components/InputText'
import colors from '../utils/Color'
import Button from '../components/Button'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  useLayoutEffect(()=>{
  check()
  },[])

  const check=async()=>{
    const value =await AsyncStorage.getItem('keyid');
    if(value!=null){
      navigation.replace('Home')
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/; // Example: 10 digits phone number
    return re.test(phone);
  };
  
  const register=()=>{
    console.log(name,password,email);
    setEmailError('');
    setPasswordError('');
    setPhoneError('');
    setNameError('');

    let isValid = true;

    if (name === '') {
      setNameError('Name is required.');
      isValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email address.');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Invalid phone number.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('user', userCredential);

      const user = userCredential._tokenResponse.email;
      const myUserUId = auth.currentUser.uid;

    setDoc(doc(db,"users", `${myUserUId}`), {
        email: user,
        phone: phone,
        name:name
      });
      setName('')
      setPhone('')
      setPassword('')
      setEmail('')
      Toast.show({
        type: 'success',
        text1: 'Registered Successfully',
      });
      navigation.navigate('Login')
    }).catch((err)=>{
      Toast.show({
        type: 'error',
        text1: err,
      });
    })
  }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: '600', color: colors.primary, marginBottom: '10%' }}>
        Firebase Register
      </Text>
      <InputText
        placeholder='Enter Your Name'
        value={name}
        setValue={setName}
        errorMessage={nameError}
      />
      <InputText
        placeholder='Enter Your Number'
        value={phone}
        max={10}
        setValue={setPhone}
        customStyle={{ marginTop: 10 }}
        errorMessage={phoneError}
      />
      <InputText
        placeholder='Enter Your Email'
        value={email}
        setValue={setEmail}
        customStyle={{ marginTop: 10 }}
        errorMessage={emailError}
      />
      <InputText
        placeholder='Enter Your Password'
        value={password}
        setValue={setPassword}
        customStyle={{ marginTop: 10, }}
        errorMessage={passwordError}
        secure='true'
      />
      <Button customStyle={{marginTop:10}} text='Register' onpress={register}/>
      <Text onPress={()=>navigation.navigate('Login')} style={{fontSize:14,color:colors.black,fontWeight:'600',marginTop:10}}>Already have an account? Click here</Text>
    </View>
    )
}

export default Register