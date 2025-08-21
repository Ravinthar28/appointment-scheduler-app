import React, { useEffect, useState } from "react";
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
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons, Feather } from "@expo/vector-icons";
import { baseUrl } from "../apiUrl";
import { new_principal_styles } from "./style";
import NoNewAppointmentsScreen from "./no_appointment";
import DateTimePicker from "@react-native-community/datetimepicker";

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

interface PendingAppointmentsScreenProps {
  email?: string | string[];
  collegeCode?: string | string[];
  selectedTab?: string;
}

interface appointments {
  collegeCode: string;
  id: string;
  userName: string;
  userEmail: string;
  desc: string;
  dateTime: Date;
}
interface RescheduleModalProps {
  isVisible: boolean;
  onClose: () => void;
  appointment: appointments | null;
  collegeCode: string;
}

// FUNCTION TO EXTRACT THE DATE AND TIME FORMAT
const extractDateTime = (dateTime: Date) => {
  const dateObject = new Date(dateTime);
  const date = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = `${
    dateObject.getHours() > 12
      ? dateObject.getHours() - 12
      : dateObject.getHours()
  }:${dateObject.getMinutes()} ${dateObject.getHours() > 12 ? "PM" : "AM"}`;

  return `${date}, ${time}`;
};

// Modal component
const RescheduleModal = ({
  isVisible,
  onClose,
  appointment,
  collegeCode,
}: RescheduleModalProps) => {
  if (!appointment) return null;

  appointment.collegeCode = collegeCode;
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [reMeetingDate, setReMeetingDate] = useState<Date>(new Date());

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || reMeetingDate;
    setShowDatePicker(false);
    if (selectedDate) {
      setReMeetingDate(currentDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || reMeetingDate;
    setShowTimePicker(false);
    if (selectedTime) {
      setReMeetingDate(currentTime);
    }
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // FUNCTION FOR ACCEPTING THE APPOINTMENT BASED ON THE STAFF ASSIGNED TIME AND RESCHEDULED TIME BY THE PRINCIPAL
  const acceptAppointment = async () => {
    appointment.dateTime = reMeetingDate;
    try {
      const url = `${baseUrl}/principal/accept-appointment`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedTab: "pending",
          selectedMeeting: appointment,
        }),
      });
      if (!response)
        throw new Error("Failed to accept the appiontment by the principal");
      const result = await response.json();
        if(result.res === 'success'){
          alert(
          `Appointment with ${
            appointment.userName
          } is scheduled on ${extractDateTime(appointment.dateTime)}`
        );
        }
        else if(result.res === 'date-not-available'){
          alert('The choosed date is not available');
        }
        else{
          alert('Something went wrong');
        }
      // router.push({
      //   pathname: "/(principal-screen)",
      //   params: {email,collegeCode,selectedTab},
      // });
    } catch (error) {
      alert(error);
    }
    onClose;
  };

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
          <Image
            source={require("../../assets/images/profile.png")}
            style={modalStyles.modalAvatar}
          />
          <Text style={modalStyles.modalStaffName}>{appointment.userName}</Text>
          <Text style={modalStyles.modalStaffEmail}>
            {appointment.userEmail}
          </Text>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalDescription}>{appointment.desc}</Text>

            <View style={modalStyles.inputRow}>
              <Text style={modalStyles.inputLabel}>Re-meeting Date:</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={modalStyles.input}
              >
                <Text>{formatDate(reMeetingDate)}</Text>
                <Feather name="calendar" size={20} color="#666" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  value={reMeetingDate}
                  minimumDate={new Date()}
                  onChange={onDateChange}
                />
              )}
            </View>
            <View style={modalStyles.inputRow}>
              <Text style={modalStyles.inputLabel}>Re-meeting Time:</Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={modalStyles.inputTime}
              >
                <Text>{formatTime(reMeetingDate)}</Text>
                <Ionicons name="time-outline" size={20} color="#666" />
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  value={reMeetingDate}
                  onChange={onTimeChange}
                />
              )}
            </View>

            <TouchableOpacity
              style={modalStyles.rescheduleButton}
              onPress={acceptAppointment}
            >
              <Text style={modalStyles.rescheduleButtonText}>Reschedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const PendingAppointmentsScreen = ({
  email,
  collegeCode,
  selectedTab,
}: PendingAppointmentsScreenProps) => {
  const [selectedMeeting, setSelectedMeeting] = useState<appointments | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  interface appointments {
    collegeCode: string;
    id: string;
    userName: string;
    userEmail: string;
    desc: string;
    dateTime: Date;
  }

  const [pendingAppointments, setPendingAppointments] = useState<
    appointments[]
  >([]);

  // FUNCTION TO FETCH THE REQUESTS DATA FROM THE DB
  const fetchRequest = async () => {
    try {
      const url = `${baseUrl}/principal/appointments-data`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, collegeCode }),
      });
      const result = await response.json();
      setPendingAppointments(result.pendingAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  // refresh control function
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequest();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  // FUNCTION TO EXTRACT THE DATE AND TIME FORMAT
  const extractDateTime = (dateTime?: Date) => {
    const dateObject = new Date(dateTime || new Date());
    const date = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = `${
      dateObject.getHours() > 12
        ? dateObject.getHours() - 12
        : dateObject.getHours()
    }:${dateObject.getMinutes()} ${dateObject.getHours() > 12 ? "PM" : "AM"}`;

    return `${date}, ${time}`;
  };

  // FUNCTION FOR ACCEPTING THE APPOINTMENT BASED ON THE STAFF ASSIGNED TIME AND RESCHEDULED TIME BY THE PRINCIPAL
  const acceptAppointment = async (btn: String) => {
    if (btn === "reschedule" && selectedMeeting) {
      selectedMeeting.dateTime = tempDate;
    }
    try {

      const url = `${baseUrl}/principal/accept-appointment`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedTab,
          selectedMeeting: selectedAppointment,
        }),
      });
      if (!response)
        throw new Error("Failed to accept the appiontment by the principal");
      const result = await response.json();
      console.log(result);
      if (result.res === "success") {
        alert(
          `Appointment with ${
            selectedAppointment?.userName
          } is scheduled on ${extractDateTime(selectedAppointment?.dateTime)}`
        );
      } else if (result.res === "date-not-available") {
        alert("The choosed date is not available");
      } else {
        alert("Something went wrong");
      }
      // router.push({
      //   pathname: "/(principal-screen)",
      //   params: {email,collegeCode,selectedTab},
      // });
      setSelectedMeeting(null);
      setSelectedAppointment(null);
      setModalVisible(false);
    } catch (error) {
      alert("The selected date is not available");
    }
  };

  // FUNCTION FOR CANCELING THE APPOINTMENT
  const cancelAppointment = async () => {
    try {
      const url = `${baseUrl}/principal/cancel-appointment`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedTab,
          selectedMeeting: selectedAppointment,
        }),
      });
      if (!response) throw new Error("Error in canceling the appointment");
      const result = await response.json();
      alert("Appointment Canceled");
      setSelectedMeeting(null);
      setSelectedAppointment(null);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Type the props
  const [modalVisible, setModalVisible] = useState(false);
  // Type selectedAppointment to be either an Appointment or null
  const [selectedAppointment, setSelectedAppointment] =
    useState<appointments | null>(null);

  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);

  const handleAppointmentCardPress = (appointment: appointments) => {
    // Type 'appointment' as Appointment
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const handleRescheduleBtnPress = () => {
    setModalVisible(false);
    setRescheduleModalVisible(true);
  };

  function AppointmentScreen() {
    return (
      <>
        {/* Appointments List */}
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {pendingAppointments.map(
            (
              appointment: appointments // Type 'appointment' in map callback
            ) => (
              <TouchableOpacity
                key={appointment.id}
                style={styles.appointmentCard}
                onPress={() => {
                  handleAppointmentCardPress(appointment);
                }}
              >
                <View style={styles.cardHeader}>
                  <Image
                    source={require("../../assets/images/profile.png")}
                    style={styles.staffAvatar}
                  />
                  <View style={styles.staffInfo}>
                    <Text style={styles.staffName}>{appointment.userName}</Text>
                    <Text style={styles.staffEmail}>
                      {appointment.userEmail}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.descriptionText}>
                    {/* Shortened description for list view */}
                    {appointment.desc.substring(0, 70)}...
                  </Text>
                  <Text style={styles.cardDateTime}>
                    {extractDateTime(appointment.dateTime)}
                    </Text>
                </View>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>New Appointments</Text>

        {pendingAppointments.length === 0 ? (
          <NoNewAppointmentsScreen />
        ) : (
          <AppointmentScreen />
        )}

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
                    {selectedAppointment.userName}
                  </Text>
                  <Text style={styles.modalStaffEmail}>
                    {selectedAppointment.userEmail}
                  </Text>
                  <Text>{extractDateTime(selectedAppointment.dateTime)}</Text>
                  <View style={styles.modalDescriptionContainer}>
                    <Text style={styles.modalDescriptionText}>
                      {selectedAppointment.desc}
                    </Text>
                  </View>

                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => {
                        acceptAppointment("pending");
                      }}
                    >
                      <Text style={styles.acceptButtonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => cancelAppointment()}
                    >
                      <Text style={styles.rejectButtonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.rescheduleButton}
                    onPress={() => handleRescheduleBtnPress()}
                  >
                    <Text
                      style={[styles.rejectButtonText, { color: "#ffffff" }]}
                    >
                      Reschedule
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>

        <RescheduleModal
          isVisible={rescheduleModalVisible}
          onClose={() => setRescheduleModalVisible(false)}
          appointment={selectedAppointment}
          collegeCode={collegeCode}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Light background similar to image
  },
    cardDateTime: {
    color: "#3C64B1",
    marginTop: 5,
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
  rescheduleButton: {
    backgroundColor: "#008000",
    borderRadius: 50,
    paddingVertical: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
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
    marginBottom: 20,
  },
  modalContent: {
    width: "100%",
  },
  modalDescription: {
    backgroundColor: "#E6E9F0",
    padding: 15,
    borderRadius: 10,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#000",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputTime: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rescheduleButton: {
    backgroundColor: "#008000",
    borderRadius: 50,
    paddingVertical: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  rescheduleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PendingAppointmentsScreen;
