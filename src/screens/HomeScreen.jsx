import { View, Text,Image,TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../utils/Color'
import Button from '../components/Button'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import {useDispatch,useSelector} from 'react-redux'
import { signOut } from 'firebase/auth'
import { setUserId } from '../redux/Action'
import InputText from '../components/InputText'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const initialCusId = useSelector(state => state.user.userId);
 
  const [cusid,setcusid]=useState(null)
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const dispatch=useDispatch();
 
 
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const value =await AsyncStorage.getItem('keyid');
    setcusid(JSON.stringify(value))
    try {
     
      // Reference to the Firestore document
      console.log('sdddsd',cusid);
      const userDocRef = doc(db,'users',cusid);
      
      // Fetch the user document
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const data=userDoc.data()
        console.log('fffff',data);
        setName(data.name)
        setEmail(data.email)
        setPhone(data.phone)
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const signout = async () => {
    try {
   
      await signOut(auth);
  
      dispatch(setUserId(null));
  

      Toast.show({
        type: 'success',
        text1: 'Log Out',
      });
  
    
      await AsyncStorage.removeItem('keyid');
  
      navigation.replace('Login');
    } catch (error) {
      
      console.error('Error during sign out:', error);
      Toast.show({
        type: 'error',
        text1: 'Sign Out Error',
        text2: 'There was an issue logging out. Please try again.',
      });
    }
  };
  

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/; 
    return re.test(phone);
  };

  const updateUser=async()=>{
    setEmailError('');
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

    if (!validatePhone(phone)) {
      setPhoneError('Invalid phone number.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const updateData = {
      name: name,
      email: email,
      phone:phone
    };

    try {
      // Reference to the document
      const userDocRef = doc(db,'users','YwhJi3efIDTOrs8YLamKlQSByVk2');
      
      // Update the document with new data
      await updateDoc(userDocRef, updateData);
      
      console.log('User document updated successfully');
      fetchUserData();
      Toast.show({
        type: 'success',
        text1: 'Update Successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
      console.log('Error updating user document', error);
    }
  
  }
 
  return (
    <View style={{ flex: 1, alignItems: 'center',}}>
  <Image 
    source={require('../assets/profile.png')} 
    style={{ 
      width: '20%',
      resizeMode: 'contain', 
      backgroundColor: colors.primary, 
      borderRadius: 30, 
      marginTop: '20%' 
    }} 
  />
  <View style={{ marginTop: '20%',width:'100%',alignItems:'center' }}>
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
  </View>
  
    <Button text='Update' customStyle={{width:'60%',marginTop:'40%',alignSelf:'center' }} onpress={updateUser} />
    <Button text='SignOut' customStyle={{width:'60%',marginTop:'5%',alignSelf:'center'}} onpress={signout} />
  
</View>
  )
}

export default HomeScreen