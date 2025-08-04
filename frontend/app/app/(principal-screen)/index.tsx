import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal, // Import Modal
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
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

  // State for the modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // Function to show the modal with meeting details
  const showMeetingDetails = (meetingData) => {
    setSelectedMeeting(meetingData);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMeeting(null);
  };

  const handleAccept = () => {
    // Logic to handle accepting the meeting
    console.log("Meeting accepted:", selectedMeeting);
    // You would typically call an API here
    closeModal();
  };

  const handleReject = () => {
    // Logic to handle rejecting the meeting
    console.log("Meeting rejected:", selectedMeeting);
    // You would typically call an API here
    closeModal();
  };

  return (
    <LinearGradient
      colors={["#E0E8F7", "#F0F4F9"]}
      style={new_principal_styles.container}
    >
      <View style={new_principal_styles.header}>
        <Image
          source={require("../../assets//images//profile.png")}
          style={new_principal_styles.profilePic}
        />
        <TouchableOpacity>
          <Ionicons name="log-out-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {selectedTab === "home" && <PrincipalHome email={userData.email} collegeCode={userData.collegeCode} />}
      {selectedTab === 'pending' && (
        <PendingAppointmentsScreen
          email={userData.email}
          collegeCode={userData.collegeCode}
          selectedTab="pending"
          onPressMeeting={showMeetingDetails} // Pass the function to the child component
        />
      )}
      {selectedTab === "confirmed" && <ConfirmedAppointmentsScreen email={userData.email} collegeCode={userData.collegeCode} />}
      {selectedTab === "past" && <CancelAppointmentsScreen email={userData.email} collegeCode={userData.collegeCode} />}

      <View style={new_principal_styles.bottomNavBar}>
        <TouchableOpacity style={new_principal_styles.navItem} onPress={() => setSelectedTab('home')}>
          <Ionicons name="home" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={new_principal_styles.navItem} onPress={() => setSelectedTab('pending')}>
          <MaterialCommunityIcons name="history" size={28} color="#A7B7DC" />
        </TouchableOpacity>
        <TouchableOpacity style={new_principal_styles.navItem} onPress={() => setSelectedTab('confirmed')}>
          <Ionicons name="checkmark-circle-outline" size={28} color="#A7B7DC" />
        </TouchableOpacity>
        <TouchableOpacity style={new_principal_styles.navItem} onPress={() => setSelectedTab('past')}>
          <FontAwesome name="calendar" size={28} color="#A7B7DC" />
        </TouchableOpacity>
      </View>

      {/* The Modal Component */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={new_principal_styles.modalCenteredView}>
          <View style={new_principal_styles.modalView}>
            {/* Close Button */}
            <TouchableOpacity onPress={closeModal} style={new_principal_styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            {/* Content from the image */}
            <Image
              source={require("../../assets/images/profile.png")} // Use the profile image or a specific image for the student
              style={new_principal_styles.modalProfilePic}
            />
            
            {selectedMeeting && (
              <>
                <Text style={new_principal_styles.modalTitle}>{selectedMeeting.staffName}</Text>
                <Text style={new_principal_styles.modalText}>
                  {selectedMeeting.staffEmail}
                <Text style={new_principal_styles.modalReasonTitle}>Reason:</Text>
                <Text style={new_principal_styles.modalReasonText}>{selectedMeeting.reason}</Text>
                <Text style={new_principal_styles.modalDateTime}>{selectedMeeting.date} at {selectedMeeting.time}</Text>
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}