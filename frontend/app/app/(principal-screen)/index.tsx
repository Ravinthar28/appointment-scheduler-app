import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  useColorScheme
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // For the background gradient
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons"; // For icons
import { router, useLocalSearchParams, useRouter } from "expo-router";

import { new_principal_styles } from "./style";
import PrincipalHome from "./principal_home";
import PendingAppointmentsScreen from "./pending_appointments";
import ConfirmedAppointmentsScreen from "./confirm_appointments";
import CancelAppointmentsScreen from "./cancel_appointment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PrincipalDashboard() {

  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === "dark"
  const statusBarBg = isDarkMode ? "black" : "white";

   const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

  const [selectedTab, setSelectedTab] = useState<
    "home" | "pending" | "confirmed" | "past"
  >("home");
  
      // PARAMETER VALUES
      const userData = useLocalSearchParams();


  async function handleLogOutPress(){
    await AsyncStorage.removeItem("user");
    router.replace('/(auth-screen)/login_new');
  }
  return (
    <>
      <StatusBar backgroundColor={statusBarBg} barStyle={statusBarStyle} />
      <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
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

      {
        selectedTab === "home" && <PrincipalHome email={userData.email} collegeCode= {userData.collegeCode}/>
      }
      {
        selectedTab === 'pending' && <PendingAppointmentsScreen email={userData.email} collegeCode={userData.collegeCode} selectedTab="pending" />
      }
      {
        selectedTab === "confirmed" && <ConfirmedAppointmentsScreen email={userData.email} collegeCode={userData.collegeCode} />
      }
      {
        selectedTab === "past" && <CancelAppointmentsScreen email={userData.email} collegeCode={userData.collegeCode} />
      }

      <View style={new_principal_styles.bottomNavBar}>
        <TouchableOpacity style={new_principal_styles.navItem} onPress={()=> setSelectedTab('home')}>
          <Ionicons name="home" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={new_principal_styles.navItem}
          onPress={() => setSelectedTab('pending')}
        >
          <MaterialCommunityIcons name="history" size={28} color="#A7B7DC" />
        </TouchableOpacity>
        <TouchableOpacity
          style={new_principal_styles.navItem}
          onPress={() => setSelectedTab('confirmed')}
        >
          <Ionicons name="checkmark-circle-outline" size={28} color="#A7B7DC" />
        </TouchableOpacity>
        <TouchableOpacity
          style={new_principal_styles.navItem}
          onPress={() => setSelectedTab('past')}
        >
          <FontAwesome name="calendar" size={28} color="#A7B7DC" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
    </SafeAreaView>
    </>
    
    
  );
}
