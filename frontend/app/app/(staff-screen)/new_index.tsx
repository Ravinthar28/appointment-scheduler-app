import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Alert,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // For the background gradient
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons"; // For icons
import { router, useLocalSearchParams, useRouter } from "expo-router";

import { new_principal_styles } from "../(principal-screen)/style";
import StaffHomeScreen from "./staff_newhome";
import UpcomingMeetingsScreen from "./upcoming";
import PastMeetingsScreen from "./past";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PrincipalDashboard() {
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === "dark";
  const statusBarBg = isDarkMode ? "black" : "white";

  const statusBarStyle = isDarkMode ? "light-content" : "dark-content";

  const handleBackPress = () => {
    // Option 1: Immediately exit the app
    // BackHandler.exitApp();  // This will close the app

    // Option 2: Optional confirmation dialog before exiting
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null, // Do nothing on cancel
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => BackHandler.exitApp(), // Exit the app on confirmation
      },
    ]);

    setSelectedTab("home");
    // Returning true prevents the default behavior (which would be to go back to the previous screen)
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

  const [selectedTab, setSelectedTab] = useState<"home" | "upcomming" | "past">(
    "home"
  );

  // PARAMETER VALUES
  const userData = useLocalSearchParams();

  async function handleLogOutPress() {
    await AsyncStorage.removeItem("user");
    router.replace("/(auth-screen)/login_new");
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={statusBarBg} barStyle={statusBarStyle} />
      <LinearGradient
        colors={["#E0E8F7", "#F0F4F9"]} // Light blue/grey gradient for background
        style={new_principal_styles.container}
      >
        <View style={new_principal_styles.header}>
          <Image
            source={require("../../assets//images//profile.png")} // Replace with your image path
            style={new_principal_styles.profilePic}
          />
          <TouchableOpacity onPress={handleLogOutPress}>
            <Ionicons name="log-out-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {selectedTab === "home" && (
          <StaffHomeScreen
            email={userData.email}
            collegeCode={userData.collegeCode}
          />
        )}
        {selectedTab === "upcomming" && (
          <UpcomingMeetingsScreen
            email={userData.email}
            collegeCode={userData.collegeCode}
          />
        )}
        {selectedTab === "past" && (
          <PastMeetingsScreen
            email={userData.email}
            collegeCode={userData.collegeCode}
          />
        )}

        <View style={new_principal_styles.bottomNavBar}>
          <TouchableOpacity
            style={new_principal_styles.navItem}
            onPress={() => setSelectedTab("home")}
          >
            <Ionicons name="home" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={new_principal_styles.navItem}
            onPress={() => setSelectedTab("upcomming")}
          >
            <MaterialCommunityIcons name="history" size={28} color="#A7B7DC" />
          </TouchableOpacity>
          <TouchableOpacity
            style={new_principal_styles.navItem}
            onPress={() => setSelectedTab("past")}
          >
            <FontAwesome name="calendar" size={28} color="#A7B7DC" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
