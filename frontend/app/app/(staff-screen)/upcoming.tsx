import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { modalStyles, principalHome } from "../(staff-screen)/staff_newhome";
import { Ionicons } from '@expo/vector-icons';
import { baseUrl } from '../apiUrl';
import NoNewAppointmentsScreen from '../(principal-screen)/no_appointment';

interface staffHomeScreenProps {
  email: string;
  collegeCode: string;
}

interface appointments {
  collegeCode: string;
  _id: string;
  userName: string;
  userEmail: string;
  desc: string;
  dateTime: Date;
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

interface MeetingModalProps {
  isVisible: boolean;
  onClose: () => void;
  meeting: appointments | null;
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
            <Text style={modalStyles.modalStaffName}>{meeting.userName}</Text>
            <Text style={modalStyles.modalStaffEmail}>{meeting.userEmail}</Text>
          </View>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTime}>
              {extractDateTime(meeting.dateTime)}
            </Text>
            <Text style={modalStyles.modalDescription}>{meeting.desc}</Text>
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
  schedule: appointments;
  onPress: (schedule: appointments) => void;
}) => (
  <TouchableOpacity
    style={principalHome.scheduleCard}
    onPress={() => onPress(schedule)}
  >
    <View style={principalHome.timeContainer}>
      <Text style={principalHome.timeText}>
  {new Date(schedule.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</Text>

      {/* <Text style={principalHome.endTimeText}>{schedule.endTime}</Text> */}
    </View>
    <View style={principalHome.divider} />
    <View style={principalHome.detailsContainer}>
      <Text style={principalHome.meetingTitle}>Appointment with Principal</Text>
      {/* <Text style={principalHome.meetingSubject}>{schedule.userEmail}</Text> */}
      <Text style={principalHome.meetingDescription} numberOfLines={1}>{schedule.desc}</Text>
    </View>
  </TouchableOpacity>
);


const UpcomingMeetingsScreen = ({email,collegeCode}:staffHomeScreenProps) => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedMeeting, setSelectedMeeting] = useState<appointments | null>(
      null
    );

  const [upcomingAppointments, setUpcomingAppointments] = useState<
      appointments[]
    >([]);

    const handleCardPress = (meeting: appointments) => {
    setSelectedMeeting(meeting);
    setModalVisible(true);
  };

  // FUNCTION TO FETCH THE APPOINTMENT DATAS FROM DB
      const fetchAppointmentData = async () => {
        try {
          const url = `${baseUrl}/staff/fetch-appointments`;
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, collegeCode }),
          });
          if (!response.ok) throw new Error("Faild to load data");
          const data = await response.json();
          setUpcomingAppointments(data.upcomingAppointments);
        } catch (error) {
          console.log(error);
        }
      };
  
      useEffect(() => {
        fetchAppointmentData();
      }, []);

      function UpComingAppointmentsCards() {
      return (
        <>
          {upcomingAppointments
            .map((schedule) => (
              <ScheduleCard
                key={schedule._id}
                schedule={schedule}
                onPress={handleCardPress}
              />
            ))}
        </>
      );
    }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Meetings:</Text>
        {upcomingAppointments.length === 0 ? (
            <NoNewAppointmentsScreen />
          ) : (
            <UpComingAppointmentsCards />
          )}

          <MeetingModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          meeting={selectedMeeting}
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80, // Add padding at the bottom for the nav bar
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E5793',
    marginBottom: 20,
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
});

export default UpcomingMeetingsScreen;