import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Modal, TextInput } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

interface MeetingDetails {
  id: string;
  time: string;
  endTime: string;
  type: string;
  title: string;
  description: string;
}

const todaySchedule: MeetingDetails[] = [
  { id: '1', time: '11:30', endTime: '13:00', type: 'Meeting', title: 'Discussion with Placement Cell', description: 'Discussion about upcoming company recruitment' },
  { id: '2', time: '14:00', endTime: '15:00', type: 'Meeting', title: 'Discussion with CS HOD', description: 'Discussion about ongoing app project' },
  { id: '3', time: '17:00', endTime: '18:00', type: 'Meeting', title: 'Discussion with Civil HOD', description: 'Discussion about ongoing app project' },
];

const ScheduleCard = ({ schedule, onPress }: { schedule: MeetingDetails, onPress: (schedule: MeetingDetails) => void }) => (
  <TouchableOpacity style={staffHome.scheduleCard} onPress={() => onPress(schedule)}>
    <View style={staffHome.timeContainer}>
      <Text style={staffHome.timeText}>{schedule.time}</Text>
      <Text style={staffHome.endTimeText}>{schedule.endTime}</Text>
    </View>
    <View style={staffHome.divider} />
    <View style={staffHome.detailsContainer}>
      <Text style={staffHome.meetingTitle}>{schedule.type}</Text>
      <Text style={staffHome.meetingSubject}>{schedule.title}</Text>
      <Text style={staffHome.meetingDescription}>{schedule.description}</Text>
    </View>
  </TouchableOpacity>
);

const RequestAppointmentModal = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
  const [meetingDate, setMeetingDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setMeetingDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setMeetingDate(selectedTime);
    }
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
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
            source={require('../../assets/images/Principal.jpg')}
            style={modalStyles.modalAvatar}
          />
          <Text style={modalStyles.modalStaffName}>Dr. C. Mathalai Sundaram</Text>
          <Text style={modalStyles.modalStaffEmail}>principal@gmail.com</Text>

          <View style={modalStyles.modalContent}>
            <TextInput style={modalStyles.textInput} placeholder="Subject" />
            <TextInput style={[modalStyles.textInput, modalStyles.multilineInput]} placeholder="Reason for appointment" multiline />

            <View style={modalStyles.inputRow}>
              <Text style={modalStyles.inputLabel}>Appointment Date:</Text>
              <TouchableOpacity style={modalStyles.inputField} onPress={() => setShowDatePicker(true)}>
                <Text>{formatDate(meetingDate)}</Text>
                <Feather name="calendar" size={20} color="#666" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={meetingDate}
                  mode="date"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View style={modalStyles.inputRow}>
              <Text style={modalStyles.inputLabel}>Appointment Time:</Text>
              <TouchableOpacity style={modalStyles.inputField} onPress={() => setShowTimePicker(true)}>
                <Text>{formatTime(meetingDate)}</Text>
                <Ionicons name="time-outline" size={20} color="#666" />
                <View style={modalStyles.amPmContainer}>
                  <Text style={modalStyles.amPmText}>AM</Text>
                  <Text style={modalStyles.amPmText}>PM</Text>
                </View>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={meetingDate}
                  mode="time"
                  onChange={onTimeChange}
                />
              )}
            </View>
          </View>

          <TouchableOpacity style={modalStyles.bookButton}>
            <Text style={modalStyles.bookButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const StaffHomeScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDetails | null>(null);

  const handleCardPress = (meeting: MeetingDetails) => {
    setSelectedMeeting(meeting);
    // You can also show a modal for meeting details here if needed.
    // For now, this is just a placeholder.
  };

  return (
    <SafeAreaView style={staffHome.safeArea}>
      <ScrollView style={staffHome.container}>
        <View style={staffHome.header}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={staffHome.profileImage}
          />
        </View>

        <View style={staffHome.welcomeCard}>
          <Text style={staffHome.welcomeTitle}>Welcome Staff !!</Text>
          <Text style={staffHome.welcomeText}>Hello Staff ! You have 10 meetings lined up for today Wishing you a successful day.</Text>
        </View>

        <View style={staffHome.mainImageContainer}>
          <Image
            source={require('../../assets/images/Principal.jpg')}
            style={staffHome.mainImage}
          />
        </View>

        <TouchableOpacity style={staffHome.requestButton} onPress={() => setModalVisible(true)}>
          <Text style={staffHome.requestButtonText}>Request Appointment</Text>
        </TouchableOpacity>

        <Text style={staffHome.sectionTitle}>Today's Schedule</Text>

        {todaySchedule.map(schedule => (
          <ScheduleCard key={schedule.id} schedule={schedule} onPress={handleCardPress} />
        ))}
      </ScrollView>

      <View style={staffHome.navBar}>
        <TouchableOpacity style={staffHome.navItem}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={staffHome.navItem}>
          <Ionicons name="time-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={staffHome.navItem}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={staffHome.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <RequestAppointmentModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const staffHome = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeCard: {
    backgroundColor: '#3E5793',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  mainImageContainer: {
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 10,
    
  },
  mainImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#fff',
  },
  requestButton: {
    backgroundColor: '#3E5793',
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E5793',
    marginBottom: 20,
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#E6E9F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#A8B3C7',
    alignItems: 'center',
  },
  timeContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C64B1',
  },
  endTimeText: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: '#A8B3C7',
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C64B1',
  },
  meetingSubject: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  meetingDescription: {
    fontSize: 12,
    color: '#555',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1C4A9E',
    borderRadius: 30,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  closeButton: {
    position: 'absolute',
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
    fontWeight: 'bold',
    color: '#3C64B1',
  },
  modalStaffEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  modalContent: {
    width: '100%',
  },
  textInput: {
    backgroundColor: '#F5F8FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A8B3C7',
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#000',
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amPmContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6E9F0',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  amPmText: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 5,
  },
  bookButton: {
    backgroundColor: '#95BD79',
    borderRadius: 50,
    paddingVertical: 15,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StaffHomeScreen;