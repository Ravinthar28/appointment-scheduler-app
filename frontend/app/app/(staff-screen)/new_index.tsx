import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // For the background gradient
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons"; // For icons
import { useLocalSearchParams, useRouter } from "expo-router";

import { new_principal_styles } from "../(principal-screen)/style";
import StaffHomeScreen from "./staff_newhome";
import UpcomingMeetingsScreen from "./upcoming";
import PastMeetingsScreen from "./past";


export default function PrincipalDashboard() {

  const [selectedTab, setSelectedTab] = useState<
    "home" | "upcomming" | "past"
  >("home");
  
      // PARAMETER VALUES
      const userData = useLocalSearchParams();


  return (
    <LinearGradient
      colors={["#E0E8F7", "#F0F4F9"]} // Light blue/grey gradient for background
      style={new_principal_styles.container}
    >
      <View style={new_principal_styles.header}>
        <Image
          source={require("../../assets//images//profile.png")} // Replace with your image path
          style={new_principal_styles.profilePic}
        />
        <TouchableOpacity>
          <Ionicons name="log-out-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {
        selectedTab === "home" && <StaffHomeScreen email={userData.email} collegeCode= {userData.collegeCode}/>
      }
      {
        selectedTab === 'upcomming' && <UpcomingMeetingsScreen email={userData.email} collegeCode= {userData.collegeCode}/>
      }
      {
        selectedTab === 'past' && <PastMeetingsScreen email={userData.email} collegeCode= {userData.collegeCode}/>
      }
      

      <View style={new_principal_styles.bottomNavBar}>
        <TouchableOpacity style={new_principal_styles.navItem} onPress={()=> setSelectedTab('home')}>
          <Ionicons name="home" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={new_principal_styles.navItem}
          onPress={() => setSelectedTab('upcomming')}
        >
          <MaterialCommunityIcons name="history" size={28} color="#A7B7DC" />
        </TouchableOpacity>
        <TouchableOpacity
          style={new_principal_styles.navItem}
          onPress={() => setSelectedTab('past')}
        >
          <FontAwesome name="calendar" size={28} color="#A7B7DC" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
