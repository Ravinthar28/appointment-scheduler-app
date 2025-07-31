import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  ImageSourcePropType,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window"); // Get screen height for modal positioning

// Define the Appointment interface
interface Appointment {
  id: string;
  name: string;
  email: string;
  description: string;
  avatar: ImageSourcePropType;
}

// Data for demonstration (same as before)
const appointments: Appointment[] = [
  // Explicitly type the appointments array
  {
    id: "1",
    name: "Staff-1",
    email: "staffmail@gmail.com",
    description: "staff-meeting.",
    avatar: require("../../assets/images/profile.png"), // Placeholder image
  },
  {
    id: "2",
    name: "Staff-2",
    email: "staffmail@gmail.com",
    description: "staff-meeting.",
    avatar: require("../../assets/images/profile.png"),
  },
  {
    id: "3",
    name: "Staff-3",
    email: "staffmail@gmail.com",
    description: "staff meeting.",
    avatar: require("../../assets/images/profile.png"),
  },
  {
    id: "4",
    name: "Staff-4",
    email: "staffmail@gmail.com",
    description: "staff meeting.",
    avatar: require("../../assets/images/profile.png"),
  },
  {
    id: "5",
    name: "Staff-5",
    email: "staffmail@gmail.com",
    description: "staff meeting.",
    avatar: require("../../assets/images/profile.png"),
  },
  {
    id: "6",
    name: "Staff-6",
    email: "staffmail@gmail.com",
    description: "staff meeting.",
    avatar: require("../../assets/images/profile.png"),
  },
];

// Define Props for the component if it receives navigation from a navigator
// (You might need to import StackNavigationProp from '@react-navigation/stack'
// or NativeStackNavigationProp from '@react-navigation/native-stack' depending on your navigator)
// For simplicity, we'll use 'any' for navigation if you don't have these types configured yet,
// but it's best practice to type navigation properly in a full TypeScript app.

const PendingAppointmentsScreen = () => {

  interface PendingAppointmentsScreenProps {
  navigation: any; // Replace 'any' with the correct navigation prop type if you use React Navigation
}
  // Type the props
  const [modalVisible, setModalVisible] = useState(false);
  // Type selectedAppointment to be either an Appointment or null
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleSettingsPress = (staffId: string) => {
    // Type 'staffId' as string
    console.log(`Settings pressed for Staff- ${staffId}`);
    // Implement navigation or action for settings
  };

  const handleAppointmentCardPress = (appointment: Appointment) => {
    // Type 'appointment' as Appointment
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  // Ensure selectedAppointment is not null before accessing its properties
  const handleAccept = () => {
    if (selectedAppointment) {
      console.log("Accepted appointment for:", selectedAppointment.name);
      // Implement accept logic
      handleCloseModal();
    }
  };

  const handleReject = () => {
    if (selectedAppointment) {
      console.log("Rejected appointment for:", selectedAppointment.name);
      // Implement reject logic
      handleCloseModal();
    }
  };

  return (
    <>
      <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Pending Appointments</Text>

      {/* Appointments List */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {appointments.map(
          (
            appointment: Appointment // Type 'appointment' in map callback
          ) => (
            <TouchableOpacity
              key={appointment.id}
              style={styles.appointmentCard}
              onPress={() => handleAppointmentCardPress(appointment)}
            >
              <View style={styles.cardHeader}>
                <Image
                  source={require("../../assets/images/profile.png")}
                  style={styles.staffAvatar}
                />
                <View style={styles.staffInfo}>
                  <Text style={styles.staffName}>{appointment.name}</Text>
                  <Text style={styles.staffEmail}>{appointment.email}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleSettingsPress(appointment.id)}
                >
                  <Icon name="settings-outline" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.descriptionLabel}>
                  Sub:Lorem ipsum dolor sit amet consectetur.
                </Text>
                <Text style={styles.descriptionText}>
                  {/* Shortened description for list view */}
                  {appointment.description.substring(0, 70)}...
                </Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Appointment Details Modal */}
      <Modal
        animationType="fade" // Or "slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Icon name="close-circle-outline" size={28} color="#999" />
            </TouchableOpacity>

            {selectedAppointment && ( // Conditional rendering ensures selectedAppointment is not null here
              <>
                <Image
                  source={require("../../assets/images/profile.png")}
                  style={styles.modalStaffAvatar}
                />
                <Text style={styles.modalStaffName}>
                  {selectedAppointment.name}
                </Text>
                <Text style={styles.modalStaffEmail}>
                  {selectedAppointment.email}
                </Text>

                <View style={styles.modalDescriptionContainer}>
                  <Text style={styles.modalDescriptionText}>
                    {selectedAppointment.description}
                  </Text>
                </View>

                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={handleAccept}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={handleReject}
                  >
                    <Text style={styles.rejectButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Light background similar to image
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: "#e0e7fa", // Light blue background for cards
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  staffAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of width/height for a circle
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#fff", // White border for avatar
  },
  staffInfo: {
    flex: 1, // Takes up remaining space
  },
  staffName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  staffEmail: {
    fontSize: 13,
    color: "#666",
  },
  cardBody: {
    paddingLeft: 60, // Align text with staff info
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },

  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Dim background
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "85%", // Adjust width as needed
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1, // Ensure it's above other content
  },
  modalStaffAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#eee",
  },
  modalStaffName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  modalStaffEmail: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },
  modalDescriptionContainer: {
    backgroundColor: "#f8f8f8", // Light background for description
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    alignSelf: "stretch", // Make it fill the width
  },
  modalDescriptionText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    color: "#555",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  acceptButton: {
    backgroundColor: "#90EE90", // Light green
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginHorizontal: 5,
    flex: 1, // Distribute space
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  rejectButton: {
    backgroundColor: "#FA8072", // Light red
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginHorizontal: 5,
    flex: 1, // Distribute space
    alignItems: "center",
  },
  rejectButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PendingAppointmentsScreen;
