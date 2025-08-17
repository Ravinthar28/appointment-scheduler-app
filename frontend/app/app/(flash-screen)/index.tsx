import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import { index_styles } from "./new_style";

export default function SplashScreen() {
  const router = useRouter();

    const [isUserFound, setUserFound] = useState(false);

    useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUserFound(true);
        } 
    };

    checkLoginStatus();
  }, []);

  useEffect(()=>{
    setTimeout(async ()=>{
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.userType === "principal") {
          router.push({
            pathname: "/(principal-screen)",
            params: {
              email: user.email,
              collegeCode: user.collegeCode,
            },
          });
        } else {
          // staff route
          router.push({
            pathname: "/(staff-screen)/new_index",
            params: {
              email: user.email,
              collegeCode: user.collegeCode,
            },
          });
        }
      }
      else{
        router.push("./(flash-screen)/flash_screen");
      }
      setAppLogoModal(false);
    },6000);
    
  },[isUserFound]);

  const [collegeLogoModal,setCollegeLogoModal] = useState(false);
  const [overLayScreen,setOverLayScreen] = useState(["rgba(0, 0, 50, 0.4)", "rgba(45, 59, 101, 0.8)"]);
  const [appLogoModal,setAppLogoModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCollegeLogoModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCollegeLogoModal(false);
      setAppLogoModal(true);
      setOverLayScreen(['rgba(33, 66, 253, 0.8)', 'rgba(69, 97, 253, 0.8)'])
    }, 3000);

    return () => clearTimeout(timer);
  }, []);




  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.replace('/(auth-screen)/register_new');
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/college-building.jpeg")}
      style={index_styles.imgBg}
    >
      <LinearGradient
        colors={overLayScreen} // Dark, transparent gradient to a more solid blue.
        style={index_styles.gradientOverlay}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      ></LinearGradient>

      <Modal
        animationType="fade"
        transparent
        visible={collegeLogoModal}
      >
        <View style={index_styles.modalInnerContainer}>
          <View style={index_styles.logoContainer}>
            <Image
              style={index_styles.clgLogo}
              source={require('../../assets/images/College_logo.png')}
            />
            <Text style={index_styles.logoTxt}>VMS</Text>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent
        visible={appLogoModal}
      >
        <View style={index_styles.modalInnerContainer}>
          <View style={index_styles.logoContainer}>
            <Image
              style={index_styles.appLogo}
              source={require('../../assets/images/app-logo.png')}
            />
            <Text style={index_styles.logoTxt}>NSCET</Text>
            <Text style={[index_styles.logoTxt,index_styles.appLogoTxt]}>Visitors Management System</Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

