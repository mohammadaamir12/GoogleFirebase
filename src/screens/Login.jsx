import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../utils/Color';
import InputText from '../components/InputText';
import Button from '../components/Button';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../redux/Action';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch=useDispatch();
 
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
 

  const login = async () => {
    console.log(password, email);
    setEmailError('');
    setPasswordError('');
    let isValid = true;
  
    if (!validateEmail(email)) {
      setEmailError('Invalid email address.');
      isValid = false;
    }
  
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }
  
    if (!isValid) {
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user login', userCredential);
      dispatch(setUserId(userCredential.user.uid));
      await AsyncStorage.setItem('keyid', userCredential.user.uid);
  
      const user = userCredential.user;
      console.log('user details', user);
  
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        console.log('authtourser', authUser);
        if (authUser) {
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
          });
          navigation.replace('Home');
        }
      });
      return unsubscribe;
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: err.message,  // Ensure you are using err.message or a specific error message
      });
    }
  };
  const check=async()=>{
    const value =await AsyncStorage.getItem('keyid');
    console.log('hi',value);
  }
  check()

  return (
    <View
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
    <Text
        style={{ fontSize: 24, fontWeight: '600', color: colors.primary, marginBottom: '10%' }}
    >FireBase Login
    </Text>
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
    <Button customStyle={{marginTop:10}} text='Login' onpress={login}/>
    <Text  onPress={()=>navigation.navigate('Register')} style={{fontSize:14,color:colors.black,fontWeight:'600',marginTop:10}}>Don't have an account? Click here</Text>

</View>
  )
}

export default Login