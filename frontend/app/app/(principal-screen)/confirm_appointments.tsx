import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { baseUrl } from "../apiUrl";
import NoNewAppointmentsScreen from "./no_appointment";

interface confirmedAppointmentScreenProps {
  email: string;
  collegeCode: string;
}

interface appointments {
  collegeCode: string;
  id: string;
  userName: string;
  userEmail: string;
  desc: string;
  dateTime: Date;
}

// RescheduleModal component
const RescheduleModal = ({
  isVisible,
  onClose,
  appointment,
  onReschedule,
  onCancel,
}: any) => {
  if (!appointment) return null;

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [reMeetingDate, setReMeetingDate] = useState<Date>(
    new Date(appointment.dateTime)
  );

  useEffect(() => {
    if (appointment && appointment.dateTime) {
      setReMeetingDate(new Date(appointment.dateTime));
    }
  }, [appointment]);

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
    }:${dateObject.getMinutes().toString().padStart(2, "0")} ${
      dateObject.getHours() >= 12 ? "PM" : "AM"
    }`;

    return `${date}, ${time}`;
  };

  const handleReschedulePress = () => {
    onReschedule(reMeetingDate);
  };

  const handleCancelPress = () => {
    onCancel();
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
            <Text style={modalStyles.modalDateTime}>
              Original: {extractDateTime(new Date(appointment.dateTime))}
            </Text>
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

            <View style={modalStyles.modalBtnContainer}>
              <TouchableOpacity
                style={modalStyles.rescheduleButton}
                onPress={handleReschedulePress}
              >
                <Text style={modalStyles.rescheduleButtonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.rescheduleButton, modalStyles.cancelBtn]}
                onPress={handleCancelPress}
              >
                <Text style={modalStyles.rescheduleButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function ConfirmedAppointmentScreen({
  email,
  collegeCode,
}: confirmedAppointmentScreenProps) {
  const [confirmedAppointments, setConfirmedAppointments] = useState<
    appointments[]
  >([]);
  const [selectedMeeting, setSelectedMeeting] = useState<appointments | null>(
    null
  );
  const [showModel, setShowModel] = useState(false);

  // This state is not needed in the parent component if the modal handles it
  // const [reMeetingDate, setReMeetingDate] = useState<Date>(new Date());

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

  useEffect(() => {
    fetchRequest();
  }, []);

  const dummyData: appointments[] = [
    {
      id: "jfoweijfoiewj",
      collegeCode: "9210",
      userName: "Staff 1",
      userEmail: "staff1@gmail.com",
      desc: "This is a dummy description for staff 1",
      dateTime: new Date(Date.now() - 3600000), // Example: 1 hour ago
    },
    {
      id: "jfoweijfoiewj2",
      collegeCode: "9210",
      userName: "Staff 2",
      userEmail: "staff2@gmail.com",
      desc: "Another dummy description for staff 2",
      dateTime: new Date(Date.now() + 86400000), // Example: 1 day from now
    },
  ];

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
    }:${dateObject.getMinutes().toString().padStart(2, "0")} ${
      dateObject.getHours() >= 12 ? "PM" : "AM"
    }`;

    return `${date}, ${time}`;
  };

  const acceptAppointment = async (newDateTime: Date) => {
    if (selectedMeeting) {
      selectedMeeting.collegeCode = collegeCode;
      try {
        const updatedMeeting = { ...selectedMeeting, dateTime: newDateTime };
        const url = `${baseUrl}/principal/accept-appointment`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedTab: "confirmed",
            selectedMeeting: updatedMeeting,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to accept the appointment by the principal");
        }
        alert(
          `Appointment with ${
            updatedMeeting.userName
          } is scheduled on ${extractDateTime(newDateTime)}`
        );
        setShowModel(false);
        setSelectedMeeting(null);
        // You might want to refresh the list of appointments here
        // fetchRequest();
      } catch (error) {
        alert(error);
      }
    }
  };

  // FUNCTION FOR CANCELING THE APPOINTMENT
  const cancelAppointment = async () => {
    if (selectedMeeting) {
      selectedMeeting.collegeCode = collegeCode;
    }
    console.log(selectedMeeting);
    try {
      const url = `${baseUrl}/principal/cancel-appointment`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedTab: "confirmed",
          selectedMeeting,
        }),
      });
      if (!response) throw new Error("Error in canceling the appointment");
      const result = await response.json();
      alert("Appointment Canceled");
      setSelectedMeeting(null);
    } catch (error) {
      console.log(error);
    }
  };

  function handleAppointmentCardPress(data: appointments) {
    setSelectedMeeting(data);
    setShowModel(true);
  }

  function handleCloseModel() {
    setShowModel(false);
    setSelectedMeeting(null);
  }
  const [refreshing, setRefreshing] = useState(false);

  // refresh control function
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequest();
    setRefreshing(false);
  };
  function AppointmentCards() {
    return (
      <ScrollView
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {confirmedAppointments.map((data) => (
          <TouchableOpacity
            key={data.id}
            style={styles.appointmentCardOuterContainer}
            onPress={() => handleAppointmentCardPress(data)}
          >
            <View style={styles.appointmentCard}>
              <View style={styles.cardProfileContainer}>
                <Image
                  source={require("../../assets/images/profile.png")}
                  style={styles.cardProfilePic}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardUserName}>{data.userName}</Text>
                <Text style={styles.cardUserEmail}>{data.userEmail}</Text>
                <Text numberOfLines={1} style={styles.cardDesc}>
                  {data.desc}
                </Text>
                <Text style={styles.cardDateTime}>
                  {extractDateTime(data.dateTime)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmed Appointments</Text>
      {confirmedAppointments.length === 0 ? (
        <NoNewAppointmentsScreen />
      ) : (
        <AppointmentCards />
      )}
      <RescheduleModal
        isVisible={showModel}
        onClose={handleCloseModel}
        appointment={selectedMeeting}
        onReschedule={acceptAppointment}
        onCancel={cancelAppointment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F5F8FF",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  appointmentCardOuterContainer: {
    width: "100%",
    backgroundColor: "#E6E9F0",
    borderRadius: 10,
    marginVertical: 4,
    padding: 10,
  },
  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardProfileContainer: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  cardProfilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardContent: {
    flex: 1,
    paddingLeft: 10,
  },
  cardUserName: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#3C64B1",
  },
  cardUserEmail: {
    marginVertical: 3,
    color: "#666",
  },
  cardDesc: {
    marginVertical: 2,
    color: "#555",
  },
  cardDateTime: {
    color: "#3C64B1",
    marginTop: 5,
  },
  appointmentModal: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  appointmentModalContainer: {
    width: 300,
    height: 300,
    backgroundColor: "white",
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
  modalDateTime: {
    textAlign: "center",
    marginBottom: 5,
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
    width: "40%",
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#FF6347",
  },
  rescheduleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
