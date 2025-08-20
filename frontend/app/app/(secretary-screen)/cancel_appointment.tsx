import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { baseUrl } from "../apiUrl";
import NoNewAppointmentsScreen from "../(principal-screen)/no_appointment";

// STYLES
import { cancel_styles,cancel_modalStyles } from "./style";

// Define the type for the appointment object
interface appointments {
  collegeCode: string;
  id: string;
  userName: string;
  userEmail: string;
  desc: string;
  dateTime: Date;
}

// Props for the RescheduleModal component
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
      const url = `${baseUrl}/secretary/accept-appointment`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedTab: "past",
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
      <View style={cancel_modalStyles.centeredView}>
        <View style={cancel_modalStyles.modalView}>
          <TouchableOpacity style={cancel_modalStyles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/profile.png")}
            style={cancel_modalStyles.modalAvatar}
          />
          <Text style={cancel_modalStyles.modalStaffName}>{appointment.userName}</Text>
          <Text style={cancel_modalStyles.modalStaffEmail}>
            {appointment.userEmail}
          </Text>
          <View style={cancel_modalStyles.modalContent}>
            <Text style={cancel_modalStyles.modalDescription}>{appointment.desc}</Text>

            <View style={cancel_modalStyles.inputRow}>
              <Text style={cancel_modalStyles.inputLabel}>Re-meeting Date:</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={cancel_modalStyles.input}
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
            <View style={cancel_modalStyles.inputRow}>
              <Text style={cancel_modalStyles.inputLabel}>Re-meeting Time:</Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={cancel_modalStyles.inputTime}
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
              style={cancel_modalStyles.rescheduleButton}
              onPress={acceptAppointment}
            >
              <Text style={cancel_modalStyles.rescheduleButtonText}>Revisit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Props for the AppointmentCard component
interface AppointmentCardProps {
  appointment: appointments;
  onPress: (appointment: appointments) => void;
}

interface CancelAPpointmentScreenProps {
  email?: string | string[];
  collegeCode?: string | string[];
}
const CancelAppointmentsScreen = ({
  email,
  collegeCode,
}: CancelAPpointmentScreenProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<appointments | null>(null);

  const handleCardPress = (appointment: appointments) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const AppointmentCard = ({ appointment, onPress }: AppointmentCardProps) => (
    <TouchableOpacity style={cancel_styles.card} onPress={() => onPress(appointment)}>
      <View style={cancel_styles.cardHeader}>
        <Image
          source={require("../../assets/images/profile.png")}
          style={cancel_styles.staffAvatar}
        />
        <View style={cancel_styles.cardTitleContainer}>
          <Text style={cancel_styles.staffName}>{appointment.userName}</Text>
          <Text style={cancel_styles.staffEmail}>{appointment.userEmail}</Text>
        </View>
      </View>
      <View style={cancel_styles.cardContent}>
        <Text style={cancel_styles.subTitle}>Msg:</Text>
        <Text style={cancel_styles.subText} numberOfLines={1}>
          {appointment.desc}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const [selectedMeeting, setSelectedMeeting] = useState<appointments | null>(
    null
  );

  const [pastAppointments, setPastAppointments] = useState<appointments[]>([]);

  // FUNCTION TO FETCH THE REQUESTS DATA FROM THE DB
  const fetchRequest = async () => {
    try {
      const url = `${baseUrl}/secretary/appointments-data`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, collegeCode }),
      });
      const result = await response.json();
      setPastAppointments(result.pastAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  // refresh control function
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequest();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  function AppointmentCards() {
    return (
      <>
        <ScrollView
          style={cancel_styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {pastAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onPress={handleCardPress}
            />
          ))}
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <View style={cancel_styles.container}>
        <Text style={cancel_styles.title}>Closed Appointments</Text>

        {pastAppointments.length === 0 ? (
          <NoNewAppointmentsScreen />
        ) : (
          <AppointmentCards />
        )}
      </View>

      <RescheduleModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        appointment={selectedAppointment}
        collegeCode={collegeCode}
      />
    </>
  );
};




export default CancelAppointmentsScreen;
