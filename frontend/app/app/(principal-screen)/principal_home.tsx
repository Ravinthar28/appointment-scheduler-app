import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal, // Import Modal
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Added Ionicons for the close button

import { new_principal_styles } from "./style";
import { baseUrl } from "../apiUrl";
import NoNewAppointmentsScreen from "./no_appointment";

interface principalHomeProps {
  email?: string | string[];
  collegeCode?: string | string[];
}

interface appointments {
  collegeCode: string;
  id: string;
  userName: string;
  userEmail: string;
  desc: string;
  dateTime: Date;
}

// New interface for the modal to include formatted date and time
interface AppointmentWithDateTime extends appointments {
  formattedDate: string;
  formattedTime: string;
}

export default function PrincipalHome({
  email,
  collegeCode,
}: principalHomeProps) {
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentWithDateTime | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [confirmedAppointments, setConfirmedAppointments] = useState<
    appointments[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // FUNCTION TO EXTRACT THE DATE AND TIME FORMAT
  // Updated to return an object with separate formatted strings
  const extractDateTime = (dateTime: Date) => {
    const dateObject = new Date(dateTime);
    const formattedDate = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = dateObject.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return { formattedDate, formattedTime };
  };

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
      setConfirmedAppointments(result.confirmedAppointments);
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

  // Function to show the modal with appointment details
  const showAppointmentDetails = (appointment: appointments) => {
    const { formattedDate, formattedTime } = extractDateTime(
      new Date(appointment.dateTime)
    );
    setSelectedAppointment({ ...appointment, formattedDate, formattedTime });
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAppointment(null);
  };

  // FUNCTION TO GENERATE APPOINTMENTS CARD
  const GenerateAppointmentsCard = ({
    collegeCode,
    id,
    userName,
    userEmail,
    desc,
    dateTime,
  }: appointments) => {
    const { formattedTime } = extractDateTime(new Date(dateTime));
    return (
      <TouchableOpacity
        key={id}
        style={new_principal_styles.scheduleItemCard}
        onPress={() =>
          showAppointmentDetails({
            collegeCode,
            id,
            userName,
            userEmail,
            desc,
            dateTime,
          })
        }
      >
        <View style={new_principal_styles.timeContainer}>
          <Text style={new_principal_styles.timeStart}>{formattedTime}</Text>
        </View>
        <View style={new_principal_styles.verticalLine}></View>
        <View style={new_principal_styles.detailsContainer}>
          <Text style={new_principal_styles.meetingType}>Meeting</Text>
          <Text style={new_principal_styles.meetingTitle}>
            {`Appointment from ${userName}`}
          </Text>
          <Text style={new_principal_styles.meetingDetails}>{desc}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  function AppointmentScreen() {
    return (
      <>
        <ScrollView
          contentContainerStyle={new_principal_styles.scheduleList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {confirmedAppointments
            .filter((appointment) => {
              const apptDate = new Date(appointment?.dateTime);
              const today = new Date();

              return (
                apptDate.getDate() === today.getDate() &&
                apptDate.getMonth() === today.getMonth() &&
                apptDate.getFullYear() === today.getFullYear()
              );
            })
            .map((appointment) => (
              <GenerateAppointmentsCard
                key={appointment.id}
                collegeCode={appointment.collegeCode}
                id={appointment.id}
                userEmail={appointment.userEmail}
                userName={appointment.userName}
                desc={appointment.desc}
                dateTime={appointment.dateTime}
              />
            ))}
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <View style={new_principal_styles.welcomeCard}>
        <Text style={new_principal_styles.welcomeTitle}>
          Welcome Principal !!
        </Text>
        <Text style={new_principal_styles.welcomeDescription}>
          Hello, Principal! I hope you have a wonderful and productive day with your appointments.
        </Text>
      </View>

      <Text style={new_principal_styles.todayScheduleText}>
        Today's Schedule
      </Text>

      {confirmedAppointments.length === 0 ? (
        <NoNewAppointmentsScreen />
      ) : (
        <AppointmentScreen />
      )}

      {/* The Modal Component */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <TouchableOpacity
              onPress={closeModal}
              style={modalStyles.closeButton}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            <Image
              source={require("../../assets/images/profile.png")} // Use the user's profile image
              style={modalStyles.modalProfilePic}
            />

            {selectedAppointment && (
              <>
                <Text style={modalStyles.modalTitle}>
                  {selectedAppointment.userName}
                </Text>
                <Text style={modalStyles.modalText}>
                  {selectedAppointment.userEmail}
                </Text>
                <Text style={modalStyles.modalDateTime}>
                  {selectedAppointment.formattedDate} at{" "}
                  {selectedAppointment.formattedTime}
                </Text>
                <Text style={modalStyles.modalDescription}>
                  {selectedAppointment.desc}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

// Separate styles for the modal to keep the main styles clean
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  modalProfilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3C64B1",
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  modalDateTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
  },
});
