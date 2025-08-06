import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const router = useRouter();

  const [isUserFound,setUserFound] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUserFound(true)
        const user = JSON.parse(storedUser);
        if (user.userType === "principal") {
          router.push({
            pathname:"/(principal-screen)",
            params:{
              email:user.email,
              collegeCode:user.collegeCode
            }
          })
        } else {
          // staff route
          router.push({
            pathname:"/(staff-screen)/new_index",
            params:{
              email:user.email,
              collegeCode:user.collegeCode
            }
          })

        }
      }
    };

    checkLoginStatus();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('./(flash-screen)/index');
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash-icon.png')} 
        style={styles.logo}
      />
    </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e', // Optional: splash background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
