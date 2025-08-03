import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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

import { new_principal_styles } from "./style";
import PrincipalHome from "./principal_home";
import PendingAppointmentsScreen from "./pending_appointments";
import ConfirmedAppointmentsScreen from "./confirm_appointments";
import CancelAppointmentsScreen from "./cancel_appointment";

export default function PrincipalDashboard() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<
    "home" | "pending" | "confirmed" | "past"
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
  );
}
