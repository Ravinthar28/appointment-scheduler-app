import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
  BackHandler,
} from "react-native";
import { styles } from "./new_style";

// ROUTER
import { useRouter } from "expo-router";
// This library provides a way to create a smooth gradient overlay.
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleBackPress = () => {

    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null, // Do nothing on cancel
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => BackHandler.exitApp(),
      },
    ]);


    return true;
  };

  useEffect(() => {
    // Add back button listener
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    // Cleanup the listener on unmount
    return () => backHandler.remove();
  }, []);

  const collegePhoto = require("../../assets/images/college-building.jpeg"); // Make sure to provide your own college photo here.

  function FlashScreen() {
    return (
      // ImageBackground is used to display the college photo as the background.
      <>
        {/* The content (text and buttons) is placed inside the gradient. */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Welcome Back Sign In{"\n"}or Register
          </Text>
          <Text style={styles.subtitle}>
            Connect With Your Principal Schedule{"\n"}Meeting.No Waiting.
          </Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/(auth-screen)/login_new")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push("/(auth-screen)/register_new")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={collegePhoto}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* A semi-transparent LinearGradient is layered on top of the image. */}
        {/* This creates the dark, atmospheric overlay effect seen in the example image. */}
        <LinearGradient
          colors={["rgba(0, 0, 50, 0.4)", "rgba(45, 59, 101, 0.8)"]} // Dark, transparent gradient to a more solid blue.
          style={styles.gradientOverlay}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <FlashScreen />
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}
