import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { baseUrl } from "../apiUrl";

const AppointmentModal = ({
  isVisible,
  onClose,
  email,
  collegeCode,
}: {
  isVisible: boolean;
  onClose: () => void;
  email:string;
  collegeCode:string
}) => {
  const [meetingDate, setMeetingDate] = useState<Date>(new Date());
  const [reason, setReason] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setMeetingDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      const newDate = new Date(
        meetingDate.setHours(selectedTime.getHours(), selectedTime.getMinutes())
      );
      setMeetingDate(newDate);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };


    // FUNCTION TO VALIDATE THE APPOINTMENT FORM AND TO STORE IT IN THE DB
    const handleSchedule = async () => {
  
      if (!reason.trim()) {
        alert(`Validation Error Please enter appointment details`);
        return;
      }
  
  
      // Alert.alert('Appointment Scheduled', `On ${meetingDate.toLocaleString()}`, [
      //   {
      //     text: 'OK',
      //     onPress: () => {
      //       // ✅ Navigate to staff home after scheduling
      //       router.push({
      //         pathname:'/(staff-screen)/home',
      //         params:userData
      //       });
      //     },
      //   },
      // ]);
  
      try{
        const messageData = {
          email:email,
          collegeCode:collegeCode,
          desc:reason,
          dateTime:meetingDate,
          appointmentWith:'secretary'
        }
        const url = `${baseUrl}/secretary/appointment-request`;
        const response = await fetch(url,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(messageData)
        });
        if(! response.ok) throw new Error("Faild to save the message");
        const result = await response.json();
        alert(result.res);
        // router.push({
        //   pathname:'/(staff-screen)/home',
        //   params:userData
        // });
      }
      catch(error){
        alert('Error in requesting');
        console.log(error);
      }
      setReason("");
      onClose();
    };

  const handleRequestAppointment = () => {
    console.log("Appointment Requested:");
    console.log("Reason:", reason);
    console.log("Date:", formatDate(meetingDate));
    console.log("Time:", formatTime(meetingDate));
    setReason("");
    onClose();
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
            source={require("../../assets/images/Principal.jpg")}
            style={modalStyles.modalAvatar}
          />
          <Text style={modalStyles.modalStaffName}>
            Dr. C. Mathalai Sundaram
          </Text>
          <Text style={modalStyles.modalStaffEmail}>principal@gmail.com</Text>

          <View style={modalStyles.modalContent}>
            <TextInput
              style={[modalStyles.textInput, modalStyles.multilineInput]}
              placeholder="Reason for appointment"
              multiline
              value={reason}
              onChangeText={setReason}
            />

            <View style={modalStyles.inputRow}>
              <Text style={modalStyles.inputLabel}>Appointment Date:</Text>
              <TouchableOpacity
                style={modalStyles.inputField}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{formatDate(meetingDate)}</Text>
                <Feather name="calendar" size={20} color="#666" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={meetingDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View style={modalStyles.inputRow}>
              <Text style={modalStyles.inputLabel}>Appointment Time:</Text>
              <TouchableOpacity
                style={modalStyles.inputField}
                onPress={() => setShowTimePicker(true)}
              >
                <Text>{formatTime(meetingDate)}</Text>
                <Ionicons name="time-outline" size={20} color="#666" />
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={meetingDate}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onTimeChange}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            style={modalStyles.bookButton}
            onPress={handleSchedule}
          >
            <Text style={modalStyles.bookButtonText}>
              Request Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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
  textInput: {
    backgroundColor: "#F5F8FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A8B3C7",
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
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
  inputField: {
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
  bookButton: {
    backgroundColor: "#95BD79",
    borderRadius: 50,
    paddingVertical: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AppointmentModal;