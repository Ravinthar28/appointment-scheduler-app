import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { baseUrl } from '../apiUrl';
import NoNewAppointmentsScreen from './no_appointment';

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

const ConfirmedAppointmentsScreen = ({ email, collegeCode }: confirmAppointmentProps) => {
  const [selectedAppointment, setSelectedAppointment] = useState<appointments | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);
  const [confirmedAppointments, setConfirmedAppointments] = useState<appointments[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

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

  // Refresh control function
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequest();
    setRefreshing(false);
  };

  // Function to show the modal with appointment details
  const showAppointmentDetails = (appointment: appointments) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAppointment(null);
  };

  // Modal button handlers
  const handleReschedule = () => {
    console.log("Reschedule button pressed for:", selectedAppointment);
    // Add your reschedule logic here (e.g., navigate to a reschedule screen)
    closeModal();
  };

  const handleCancel = () => {
    console.log("Cancel button pressed for:", selectedAppointment);
    // Add your cancel logic here (e.g., API call to cancel the appointment)
    closeModal();
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

      {/* The Modal Component */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            {/* Close Button */}
            <TouchableOpacity onPress={closeModal} style={modalStyles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            {/* Profile Image */}
            <Image
              source={require('../../assets/images/profile.png')}
              style={modalStyles.modalProfilePic}
            />

            {selectedAppointment && (
              <>
                <Text style={modalStyles.modalTitle}>{selectedAppointment.userName}</Text>
                <Text style={modalStyles.modalText}>{selectedAppointment.userEmail}</Text>
                <Text style={modalStyles.modalDescription}>
                  {selectedAppointment.desc}
                </Text>

                {/* Reschedule & Cancel Buttons */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 20, // Add horizontal padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#3E5793',
    padding: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E5793',
    marginBottom: 20,
    marginTop: 20,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#E6E9F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#A8B3C7',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  staffAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardTitleContainer: {
    flex: 1,
  },
  staffName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C64B1',
  },
  staffEmail: {
    fontSize: 12,
    color: '#666',
  },
  settingsIcon: {
    padding: 5,
  },
  cardContent: {
    flexDirection: 'row',
    marginTop: 5,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 5,
  },
  subText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  // Note: I've moved the nav bar styles to the parent component
  // as it's typically part of the main dashboard, not this screen.
});

// New styles for the modal
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
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
    fontWeight: 'bold',
    color: '#3C64B1',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: '#FFC107',
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F44336',
    borderRadius: 10,
    paddingVertical: 12,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfirmedAppointmentsScreen;