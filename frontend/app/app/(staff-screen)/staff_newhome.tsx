// File: app/(principal)/staff/StaffHomeScreen.js

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import components from their respective new files
import { Header, NavBar } from "./new_index";
import RequestAppointmentModal from "../(staff-screen)/request_page";

// Dummy data and other components remain the same
const todaySchedule = [
  {
    id: "1",
    time: "11:30",
    endTime: "13:00",
    type: "Meeting",
    title: "Discussion with Placement Cell",
    description: "Discussion about upcoming company recruitment",
  },
  {
    id: "2",
    time: "14:00",
    endTime: "15:00",
    type: "Meeting",
    title: "Discussion with CS HOD",
    description: "Discussion about ongoing app project",
  },
  {
    id: "3",
    time: "17:00",
    endTime: "18:00",
    type: "Meeting",
    title: "Discussion with Civil HOD",
    description: "Discussion about ongoing app project",
  },
];

interface MeetingDetails {
  id: string;
  time: string;
  endTime: string;
  type: string;
  title: string;
  description: string;
}

interface MeetingModalProps {
  isVisible: boolean;
  onClose: () => void;
  meeting: MeetingDetails | null;
}

// Keep the MeetingModal here since it's specific to this screen's schedule cards
const MeetingModal = ({ isVisible, onClose, meeting }: MeetingModalProps) => {
  if (!meeting) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <View style={modalStyles.modalHeader}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={modalStyles.modalAvatar}
            />
            <Text style={modalStyles.modalStaffName}>Staff-3</Text>
            <Text style={modalStyles.modalStaffEmail}>staffmail@gmail.com</Text>
          </View>
          <View style={modalStyles.modalContent}>
            <Text
              style={modalStyles.modalTime}
            >{`${meeting.time} - ${meeting.endTime}`}</Text>
            <Text style={modalStyles.modalDescription}>
              {meeting.description}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ScheduleCard = ({
  schedule,
  onPress,
}: {
  schedule: (typeof todaySchedule)[0];
  onPress: (schedule: MeetingDetails) => void;
}) => (
  <TouchableOpacity
    style={principalHome.scheduleCard}
    onPress={() => onPress(schedule)}
  >
    <View style={principalHome.timeContainer}>
      <Text style={principalHome.timeText}>{schedule.time}</Text>
      <Text style={principalHome.endTimeText}>{schedule.endTime}</Text>
    </View>
    <View style={principalHome.divider} />
    <View style={principalHome.detailsContainer}>
      <Text style={principalHome.meetingTitle}>{schedule.type}</Text>
      <Text style={principalHome.meetingSubject}>{schedule.title}</Text>
      <Text style={principalHome.meetingDescription}>
        {schedule.description}
      </Text>
    </View>
  </TouchableOpacity>
);

const StaffHomeScreen = () => {
  type TabType = "home" | "upcoming" | "past";
  const [selectedTab, setSelectedTab] = useState<TabType>("home");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDetails | null>(
    null
  );
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);

  const handleCardPress = (meeting: MeetingDetails) => {
    setSelectedMeeting(meeting);
    setModalVisible(true);
  };

  const openRequestModal = () => {
    setIsRequestModalVisible(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalVisible(false);
  };

  const renderHomeContent = () => (
    <>
      <View style={principalHome.welcomeCard}>
        <Text style={principalHome.welcomeTitle}>Welcome Staff !!</Text>
        <Text style={principalHome.welcomeText}>
          Hello Staff! You have meetings lined up for today. Wishing you a
          successful day.
        </Text>
      </View>

      <View style={principalHome.mainImageContainer}>
        <Image
          source={require("../../assets/images/Principal.jpg")}
          style={principalHome.mainImage}
        />
      </View>

      <TouchableOpacity
        style={principalHome.requestButton}
        onPress={openRequestModal}
      >
        <Text style={principalHome.requestButtonText}>Request Appointment</Text>
      </TouchableOpacity>

      <View>
        <Text style={principalHome.sectionTitle}>Today's Schedule</Text>
        {todaySchedule.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onPress={handleCardPress}
          />
        ))}
      </View>
    </>
  );

  const renderUpcomingContent = () => (
    <View>
      <Text style={principalHome.sectionTitle}>Upcoming Meetings</Text>
      <Text style={principalHome.placeholderText}>
        This is where you will list all your upcoming meetings.
      </Text>
    </View>
  );

  const renderPastContent = () => (
    <View>
      <Text style={principalHome.sectionTitle}>Past Meetings</Text>
      <Text style={principalHome.placeholderText}>
        This is where you will list all your past meetings.
      </Text>
    </View>
  );

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
        <Header />

        <ScrollView contentContainerStyle={principalHome.scrollViewContent}>
          {selectedTab === "home" && renderHomeContent()}
          {selectedTab === "upcoming" && renderUpcomingContent()}
          {selectedTab === "past" && renderPastContent()}
        </ScrollView>

        <NavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <MeetingModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          meeting={selectedMeeting}
        />

        <RequestAppointmentModal
          isVisible={isRequestModalVisible}
          onClose={closeRequestModal}
        />
      </View>
    </>
  );
};

const principalHome = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  welcomeCard: {
    backgroundColor: "#3E5793",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  mainImageContainer: {
    alignItems: "center",
    marginTop: -20,
    marginBottom: 10,
  },
  mainImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#fff",
  },
  requestButton: {
    backgroundColor: "#3E5793",
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  requestButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3E5793",
    marginBottom: 20,
  },
  scheduleCard: {
    flexDirection: "row",
    backgroundColor: "#E6E9F0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#A8B3C7",
    alignItems: "center",
  },
  timeContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  endTimeText: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    width: 2,
    height: "100%",
    backgroundColor: "#A8B3C7",
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  meetingSubject: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  meetingDescription: {
    fontSize: 12,
    color: "#555",
  },
  placeholderText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#666",
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalStaffName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  modalStaffEmail: {
    fontSize: 14,
    color: "#666",
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
  },
  modalTime: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    backgroundColor: "#E6E9F0",
    padding: 15,
    borderRadius: 10,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

export default StaffHomeScreen;