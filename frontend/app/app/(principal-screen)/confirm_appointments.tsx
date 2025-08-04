import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Modal, Platform } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { baseUrl } from '../apiUrl';
import NoNewAppointmentsScreen from './no_appointment';

// You will need to install this library:
// npm install @react-native-community/datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

interface confirmAppointmentProps {
  email?: string | string[],
  collegeCode?: string | string[]
}

interface appointments {
  collegeCode: string;
  id: string;
  userName: string;
  userEmail: string;
  desc: string;
  dateTime: Date;
}

interface AppointmentWithDateTime extends appointments {
  date: string;
  time: string;
}

const ConfirmedAppointmentsScreen = ({ email, collegeCode }: confirmAppointmentProps) => {
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithDateTime | null>(null);
  const [confirmedAppointments, setConfirmedAppointments] = useState<appointments[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRescheduleModalVisible, setIsRescheduleModalVisible] = useState(false); // New state for reschedule modal
  const [rescheduleDateTime, setRescheduleDateTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const extractDateTime = (dateTime: Date) => {
    const dateObject = new Date(dateTime);
    const date = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = dateObject.toLocaleTimeString("en-US", {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return { date, time };
  };

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

  const showAppointmentDetails = (appointment: appointments) => {
    const { date, time } = extractDateTime(new Date(appointment.dateTime));
    setSelectedAppointment({ ...appointment, date, time });
    setIsModalVisible(true);
    setRescheduleDateTime(new Date(appointment.dateTime));
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAppointment(null);
  };

  const closeRescheduleModal = () => {
    setIsRescheduleModalVisible(false);
  };

  const handleReschedule = () => {
    closeModal();
    setIsRescheduleModalVisible(true);
  };

  const handleConfirmReschedule = () => {
    console.log("Confirm reschedule button pressed");
    console.log("Appointment ID:", selectedAppointment?.id);
    console.log("New Date:", rescheduleDateTime.toLocaleDateString());
    console.log("New Time:", rescheduleDateTime.toLocaleTimeString());
    // Here you would add the API call to update the appointment
    closeRescheduleModal();
  };

  const handleCancel = () => {
    console.log("Cancel button pressed for:", selectedAppointment);
    closeModal();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || rescheduleDateTime;
    setShowDatePicker(Platform.OS === 'ios');
    setRescheduleDateTime(currentDate);
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || rescheduleDateTime;
    setShowTimePicker(Platform.OS === 'ios');
    setRescheduleDateTime(currentTime);
  };

  const AppointmentCard = ({
    collegeCode,
    id,
    userName,
    userEmail,
    desc,
    dateTime,
  }: appointments) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => showAppointmentDetails({ collegeCode, id, userName, userEmail, desc, dateTime })}
    >
      <View style={styles.cardHeader}>
        <Image
          source={require('../../assets/images/profile.png')}
          style={styles.staffAvatar}
        />
        <View style={styles.cardTitleContainer}>
          <Text style={styles.staffName}>{userName}</Text>
          <Text style={styles.staffEmail}>{userEmail}</Text>
        </View>
        <TouchableOpacity style={styles.settingsIcon}>
          <Feather name="settings" size={20} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.subTitle}>Sub:</Text>
        <Text style={styles.subText}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchRequest();
  }, []);

  function AppointmentScreen() {
    return (
      <ScrollView style={styles.listContainer}>
        {confirmedAppointments.map(appointment => (
          <AppointmentCard key={appointment.id} {...appointment} />
        ))}
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmed Appointments:</Text>
      {confirmedAppointments.length === 0 ? <NoNewAppointmentsScreen /> : <AppointmentScreen />}
      
      {/* Main Appointment Details Modal */}
      <Modal animationType="fade" transparent={true} visible={isModalVisible} onRequestClose={closeModal}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <TouchableOpacity onPress={closeModal} style={modalStyles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Image source={require('../../assets/images/profile.png')} style={modalStyles.modalProfilePic} />
            {selectedAppointment && (
              <>
                <Text style={modalStyles.modalTitle}>{selectedAppointment.userName}</Text>
                <Text style={modalStyles.modalText}>{selectedAppointment.userEmail}</Text>
                <Text style={modalStyles.modalDateTime}>{selectedAppointment.date} at {selectedAppointment.time}</Text>
                <Text style={modalStyles.modalDescription}>{selectedAppointment.desc}</Text>
                <View style={modalStyles.modalButtonContainer}>
                  <TouchableOpacity style={modalStyles.rescheduleButton} onPress={handleReschedule}>
                    <Text style={modalStyles.buttonText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={modalStyles.cancelButton} onPress={handleCancel}>
                    <Text style={modalStyles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Reschedule Modal */}
      <Modal animationType="fade" transparent={true} visible={isRescheduleModalVisible} onRequestClose={closeRescheduleModal}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <TouchableOpacity onPress={closeRescheduleModal} style={modalStyles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={rescheduleModalStyles.modalTitle}>Reschedule Appointment</Text>
            <Text style={rescheduleModalStyles.currentDateTime}>Current: {selectedAppointment?.date} at {selectedAppointment?.time}</Text>

            <View style={rescheduleModalStyles.pickerContainer}>
              <Text style={rescheduleModalStyles.pickerLabel}>New Date:</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={rescheduleModalStyles.pickerButton}>
                <Text style={rescheduleModalStyles.pickerButtonText}>{rescheduleDateTime.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>

            <View style={rescheduleModalStyles.pickerContainer}>
              <Text style={rescheduleModalStyles.pickerLabel}>New Time:</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(true)} style={rescheduleModalStyles.pickerButton}>
                <Text style={rescheduleModalStyles.pickerButtonText}>{rescheduleDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}</Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={rescheduleDateTime}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={rescheduleDateTime}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
            
            <TouchableOpacity style={rescheduleModalStyles.confirmButton} onPress={handleConfirmReschedule}>
              <Text style={rescheduleModalStyles.confirmButtonText}>Confirm Reschedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F8FF' },
  container: { flex: 1, backgroundColor: '#F5F8FF', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, backgroundColor: '#3E5793', padding: 15 },
  profileImage: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#3E5793', marginBottom: 20, marginTop: 20 },
  listContainer: { flex: 1, paddingBottom: 80 },
  card: { backgroundColor: '#E6E9F0', borderRadius: 10, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#A8B3C7' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  staffAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  cardTitleContainer: { flex: 1 },
  staffName: { fontSize: 18, fontWeight: 'bold', color: '#3C64B1' },
  staffEmail: { fontSize: 12, color: '#666' },
  settingsIcon: { padding: 5 },
  cardContent: { flexDirection: 'row', marginTop: 5 },
  subTitle: { fontSize: 14, fontWeight: 'bold', color: '#000', marginRight: 5 },
  subText: { flex: 1, fontSize: 14, color: '#555' },
});

const modalStyles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalView: { width: '90%', backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  closeButton: { position: 'absolute', top: 15, right: 15 },
  modalProfilePic: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#3C64B1', marginBottom: 5 },
  modalText: { fontSize: 16, color: '#666', marginBottom: 15 },
  modalDescription: { fontSize: 16, color: '#333', textAlign: 'center', lineHeight: 22, marginBottom: 10 },
  modalDateTime: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  rescheduleButton: { flex: 1, backgroundColor: '#FFC107', borderRadius: 10, paddingVertical: 12, marginRight: 10, alignItems: 'center' },
  cancelButton: { flex: 1, backgroundColor: '#F44336', borderRadius: 10, paddingVertical: 12, marginLeft: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

const rescheduleModalStyles = StyleSheet.create({
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#3C64B1', marginBottom: 10 },
  currentDateTime: { fontSize: 16, color: '#666', marginBottom: 20 },
  pickerContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 15 },
  pickerLabel: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#3C64B1' },
  pickerButton: { flex: 2, borderWidth: 1, borderColor: '#A8B3C7', borderRadius: 8, padding: 10, alignItems: 'center' },
  pickerButtonText: { fontSize: 16 },
  confirmButton: { backgroundColor: '#28a745', borderRadius: 10, paddingVertical: 12, marginTop: 20, width: '100%', alignItems: 'center' },
  confirmButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default ConfirmedAppointmentsScreen;