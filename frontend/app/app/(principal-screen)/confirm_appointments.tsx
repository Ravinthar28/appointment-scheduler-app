import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";

import { baseUrl } from "../apiUrl";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import DateTimePicker from '@react-native-community/datetimepicker';



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

export default function ConfirmedAppointmentScreen({
  email,
  collegeCode,
}: confirmedAppointmentScreenProps) {
  const [confirmedAppointments, setConfirmedAppointments] = useState<
    appointments[]
  >([]);

  const [selectedMeeting,setSelectedMeeting] = useState<appointments | null> (null);
  const [showModel,setShowModel] = useState(false);

  const [reMeetingDate, setReMeetingDate] = useState<Date>(new Date());

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

  useEffect(() => {
    fetchRequest();
  }, []);

  const dummyData = [
    {
      id: "jfoweijfoiewj",
      collegeCode:'9210',
      userName: "Staff 1",
      userEmail: "staff1@gmail.com",
      desc: "fjiaewf ioewjf kajweiofj awejfio jewf joiwe fj",
      dateTime: reMeetingDate,
    },
    {
      id: "jfoweijfoiewj",
      collegeCode:'9210',
      userName: "Staff 2",
      userEmail: "staff2@gmail.com",
      desc: "fjiaewf ioewjf kajweiofj awejfio jewf joiwe fj",
      dateTime: reMeetingDate,
    },
  ];

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


      const acceptAppointment = async (btn: String) => {
        if (btn === "reschedule" && selectedMeeting) {
          selectedMeeting.dateTime = reMeetingDate;
        }
        try {
          const url = `${baseUrl}/principal/accept-appointment`;
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              selectedTab:'confirmed',
              selectedMeeting,
            }),
          });
          if (!response)
            throw new Error("Failed to accept the appiontment by the principal");
          alert(
            `Appointment with ${
              selectedMeeting?.userName
            } is scheduled on ${extractDateTime(reMeetingDate)}`
          );
          // router.push({
          //   pathname: "/(principal-screen)/home",
          //   params: userData,
          // });
          setSelectedMeeting(null);
        } catch (error) {
          alert(error);
        }
        setShowModel(false);
      };

  function AppointmentModel(){

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
        const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    
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

    function handleCloseModel () {
      setShowModel(false);
      setSelectedMeeting(null);
    }
    function handleReschedule(){
      setShowModel(false);
      
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModel}
            onRequestClose={handleCloseModel}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <TouchableOpacity style={modalStyles.closeButton} onPress={handleCloseModel}>
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                    <Image
                        source={require('../../assets/images/profile.png')}
                        style={modalStyles.modalAvatar}
                    />
                    <Text style={modalStyles.modalStaffName}>{selectedMeeting?.userName}</Text>
                    <Text style={modalStyles.modalStaffEmail}>{selectedMeeting?.userEmail}</Text>
                    <View style={modalStyles.modalContent}>
                      <Text style={modalStyles.modalDateTime}>
                          {extractDateTime(selectedMeeting?.dateTime)}
                        </Text>
                        <Text style={modalStyles.modalDescription}>
                            {selectedMeeting?.desc}
                        </Text>
                        
                        <View style={modalStyles.inputRow}>
                            <Text style={modalStyles.inputLabel}>Re-meeting Date:</Text>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                style={modalStyles.input}
                            >
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
                            <TouchableOpacity style={modalStyles.rescheduleButton}>
                            <Text style={modalStyles.rescheduleButtonText}>Reschedule</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[modalStyles.rescheduleButton,modalStyles.cancelBtn]}>
                            <Text style={modalStyles.rescheduleButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </View>
        </Modal>
    );
  }

  function handleAppointmentCardPress(data:appointments){
    setSelectedMeeting(data);
    setShowModel(true);
  }

  function AppointmentCards() {
    return (
      <ScrollView style={{height:"100%"}}>
        {dummyData.map((data) => (
          <>
            <TouchableOpacity style={styles.appointmentCardOuterContainer} onPress={()=>handleAppointmentCardPress(data)}>
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
          </>
        ))}
      </ScrollView>
    );
  }

  return (<View style={styles.container}>

    <AppointmentCards />

    {
      showModel && <AppointmentModel />
    }
    
  </View>);
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    paddingHorizontal: 5,
  },

  appointmentCardOuterContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F8FF",
    borderRadius: 10,
    marginVertical:4
  },
  appointmentCard: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  cardProfileContainer: {
    width: "20%",
    height: "100%",
    objectFit: "contain",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardProfilePic: {
    width: 70,
    height: 70,
    borderRadius: "50%",
  },
  cardContent: {
    width: "80%",
    height: "100%",

    padding: 10,
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
  },
  appointmentModal:{
    backgroundColor:"rgba(0,0,0,0.5)"
  },
  appointmentModalContainer:{
    width:300,
    height:300,
    backgroundColor:"white"
  }
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
    modalDateTime:{
      textAlign:"center",
      marginBottom:5
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
        width: '40%',
        alignItems: 'center',
    },
    cancelBtn:{
      backgroundColor:"#FF6347"
    },
    rescheduleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalBtnContainer:{
      display:"flex",
      alignItems:"center",
      justifyContent:"space-around",
      flexDirection:"row"
    }
});