import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Modal, Platform, RefreshControl } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { baseUrl } from '../apiUrl';
import NoNewAppointmentsScreen from './no_appointment';

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
  collegeCode:string
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
const RescheduleModal = ({ isVisible, onClose, appointment,collegeCode }: RescheduleModalProps) => {
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
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const formatTime = (date: Date): string => {
      const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      return new Intl.DateTimeFormat('en-US', options).format(date);
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
                      selectedTab:'past',
                      selectedMeeting:appointment,
                    }),
                  });
                  if (!response)
                    throw new Error("Failed to accept the appiontment by the principal");
                  alert(
                    `Appointment with ${
                      appointment?.userName
                    } is scheduled on ${extractDateTime(appointment?.dateTime || reMeetingDate)}`
                  );
                  // router.push({
                  //   pathname: "/(principal-screen)",
                  //   params: {email,collegeCode,selectedTab},
                  // });
                } catch (error) {
                  alert(error);
                }
                onClose
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
                        source={require('../../assets/images/profile.png')}
                        style={modalStyles.modalAvatar}
                    />
                    <Text style={modalStyles.modalStaffName}>{appointment.userName}</Text>
                    <Text style={modalStyles.modalStaffEmail}>{appointment.userEmail}</Text>
                    <View style={modalStyles.modalContent}>
                        <Text style={modalStyles.modalDescription}>
                            {appointment.desc}
                        </Text>
                        
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

                        <TouchableOpacity style={modalStyles.rescheduleButton} onPress={acceptAppointment}>
                            <Text style={modalStyles.rescheduleButtonText}>Revisit</Text>
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

interface CancelAPpointmentScreenProps{
  email?:string | string[],
  collegeCode?:string | string[]
}
const CancelAppointmentsScreen = ({email,collegeCode}:CancelAPpointmentScreenProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAppointment, setSelectedAppointment] = useState<appointments | null>(null);

    // const confirmedAppointments: appointments[] = [
    //     { id: '1', name: 'Staff-1', email: 'staffone@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    //     { id: '2', name: 'Staff-2', email: 'stafftwo@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    //     { id: '3', name: 'Staff-3', email: 'staffthree@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    //     { id: '4', name: 'Staff-4', email: 'stafffour@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    //     { id: '5', name: 'Staff-5', email: 'stafffive@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    //     { id: '6', name: 'Staff-6', email: 'staffsix@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    // ];

    const handleCardPress = (appointment: appointments) => {
        setSelectedAppointment(appointment);
        setModalVisible(true);
    };

    const AppointmentCard = ({ appointment, onPress }: AppointmentCardProps) => (
        <TouchableOpacity style={styles.card} onPress={() => onPress(appointment)}>
            <View style={styles.cardHeader}>
                <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.staffAvatar}
                />
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.staffName}>{appointment.userName}</Text>
                    <Text style={styles.staffEmail}>{appointment.userEmail}</Text>
                </View>
                <TouchableOpacity style={styles.settingsIcon}>
                    <Feather name="settings" size={20} color="#888" />
                </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.subTitle}>Msg:</Text>
                <Text style={styles.subText} numberOfLines={1}>{appointment.desc}</Text>
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
          const url = `${baseUrl}/principal/appointments-data`;
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email,collegeCode}),
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
  
    function AppointmentCards(){
        return(
            <>
                <ScrollView style={styles.listContainer} refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                      }>
                    {pastAppointments.map(appointment => (
                        <AppointmentCard key={appointment.id} appointment={appointment} onPress={handleCardPress} />
                    ))}
                </ScrollView>
            </>
        )
    }

    return (
        <><View style={styles.container}>

                <Text style={styles.title}>Closed Appointments</Text>

                {
                    pastAppointments.length === 0 ? <NoNewAppointmentsScreen /> : <AppointmentCards />
                }
                

            </View>
            
            <RescheduleModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                appointment={selectedAppointment}
                collegeCode = {collegeCode}
            />
        
        </>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
    listContainer: {
        flex: 1,
        paddingHorizontal: 15,
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
    activeNavItem: {
        backgroundColor: '#2E69D8',
        borderRadius: 25,
        width: 50,
        height: 50,
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
    modalDescription: {
        backgroundColor: '#E6E9F0',
        padding: 15,
        borderRadius: 10,
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
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
    input: {
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
    inputTime: {
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
    rescheduleButton: {
        backgroundColor: '#008000',
        borderRadius: 50,
        paddingVertical: 15,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    rescheduleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CancelAppointmentsScreen;