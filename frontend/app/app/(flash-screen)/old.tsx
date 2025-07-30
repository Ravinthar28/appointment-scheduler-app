import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

// LOCAL STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage';

// STYLES
import { styles } from './style';


export default function HomeScreen() {
  const router = useRouter();

  const [shoFlashScreen,setShowFlashScreen] = useState(true);
  const [isLogin,setIsLogin] = useState('');
  const [email,setEmail] = useState('');
  const [collegeCode,setCollegeCode] = useState('');
  const [selectedRole,setSelectedRole] = useState('');

//   const retriveData = async ()=>{
//   try{
//     const isLoginVal = await AsyncStorage.getItem('isLogin');
//     if( isLoginVal != null) setIsLogin(isLoginVal);
//     const emailVal = await AsyncStorage.getItem('email');
//     if( emailVal != null) setEmail(emailVal);
//     const collegeCodeVal = await AsyncStorage.getItem('collegeCode');
//     if( collegeCodeVal != null) setCollegeCode(collegeCodeVal);
//     const selectedRoleVal = await AsyncStorage.getItem('selectedRole');
//     if( selectedRoleVal != null) setSelectedRole(selectedRoleVal);
//   }
//   catch(error){
//     console.log("Error in fetching the data from the local storage");
//   }
// }

const descideScreen = ()=>{
  if(isLogin === 'true'){
    setShowFlashScreen(true);
    if(selectedRole == 'principal') router.push({
            pathname:'/(principal-screen)/home',
            params: {
              email,
              collegeCode
            }
          })
    if(selectedRole == 'staff') router.push({
      pathname:'/(staff-screen)/home',
      params:{
        email,
        collegeCode
      }
    });
  }
  else setShowFlashScreen(false);
}

useEffect(()=>{
  // retriveData();
  descideScreen();
  
})


// function FlashScreen(){
//   return(
    
//   )
// }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Large Centered Image */}
        <Image
          source={require('../../assets/images/appointment login.jpeg')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Heading Text */}
        <Text style={styles.heading}>
          Connect With Your Principal{'\n'}Schedule Meetings. No Waiting.
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.buttonTextAlt}>Register</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>Don’t have a college code? Learn more</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


