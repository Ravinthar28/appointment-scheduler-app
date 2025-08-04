// File: app/(principal)/staff/StaffHomeScreen.js

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import RequestAppointmentModal from "../(staff-screen)/request_page";
import { baseUrl } from "../apiUrl";

// Dummy data and other components remain the same
const todaySchedule = [
  {
    id: "1",
    time: "11:30",
    endTime: "13:00",
    type: "Meeting",
    title: "Discussion with Placement Cell",
    description: "Discussion about upcoming company recruitment",
  },
  {
    id: "2",
    time: "14:00",
    endTime: "15:00",
    type: "Meeting",
    title: "Discussion with CS HOD",
    description: "Discussion about ongoing app project",
  },
  {
    id: "3",
    time: "17:00",
    endTime: "18:00",
    type: "Meeting",
    title: "Discussion with Civil HOD",
    description: "Discussion about ongoing app project",
  },
];


interface appointments {
    collegeCode:string,
    _id:string,
    userName: string;
    userEmail:string
    desc: string;
    dateTime: Date;
  }
interface MeetingModalProps {
  isVisible: boolean;
  onClose: () => void;
  meeting: appointments | null;
}

   // FUNCTION TO EXTRACT THE DATE AND TIME FORMAT
    const extractDateTime = (dateTime : Date) => {
      const dateObject = new Date(dateTime);
      const date = dateObject.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const time = `${(dateObject.getHours() > 12)? dateObject.getHours()-12: dateObject.getHours()}:${dateObject.getMinutes()} ${(dateObject.getHours() > 12) ? 'PM' : 'AM'}`;

      return `${date}, ${time}`;
    };

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
            <Text
              style={modalStyles.modalTime}
            >{extractDateTime(meeting.dateTime)}</Text>
            <Text style={modalStyles.modalDescription}>
              {meeting.desc}
            </Text>
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
  schedule: appointments
  onPress: (schedule: appointments) => void;
}) => (
  <TouchableOpacity
    style={principalHome.scheduleCard}
    onPress={() => onPress(schedule)}
  >
    <View style={principalHome.timeContainer}>
      <Text style={principalHome.timeText}>{}</Text>
      {/* <Text style={principalHome.endTimeText}>{schedule.endTime}</Text> */}
    </View>
    <View style={principalHome.divider} />
    <View style={principalHome.detailsContainer}>
      <Text style={principalHome.meetingTitle}>{schedule.userName}</Text>
      <Text style={principalHome.meetingSubject}>{schedule.userEmail}</Text>
      <Text style={principalHome.meetingDescription}>
        {schedule.desc}
      </Text>
    </View>
  </TouchableOpacity>
);

interface staffHomeScreenProps{
  email:string | string[],
  collegeCode:string | string[]
}
const StaffHomeScreen = ({email,collegeCode}:staffHomeScreenProps) => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<appointments | null>(
    null
  );
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);


  const dataTemplate = {
      _id:"",
      collegeCode:"",
      userName: "",
      userEmail:"",
      desc: "",
      dateTime: new Date(),
    }

    const [upcomingAppointments, setUpcomingAppointments] = useState([dataTemplate]);

  

  const handleCardPress = (meeting: appointments) => {
    setSelectedMeeting(meeting);
    setModalVisible(true);
  };

  const openRequestModal = () => {
    setIsRequestModalVisible(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalVisible(false);
  };

  const renderHomeContent = () => {
    // FUNCTION TO FETCH THE APPOINTMENT DATAS FROM DB
      const fetchAppointmentData = async ()=>{
        try{
          const url = `${baseUrl}/staff/fetch-appointments`;
          const response = await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,collegeCode})
          });
          if(! response.ok) throw new Error("Faild to load data");
          const data = await response.json();
          console.log(data);
          setUpcomingAppointments(data.upcomingAppointments);
        }
        catch(error){
          console.log(error);
        }
      }

    useEffect(()=>{
          fetchAppointmentData();
          console.log(upcomingAppointments);
        },[]);
    return(
      <>
      <View style={principalHome.welcomeCard}>
        <Text style={principalHome.welcomeTitle}>Welcome Staff !!</Text>
        <Text style={principalHome.welcomeText}>
          Hello Staff! You have meetings lined up for today. Wishing you a
          successful day.
        </Text>
      </View>

      <View style={principalHome.mainImageContainer}>
        <Image
          source={require("../../assets/images/Principal.jpg")}
          style={principalHome.mainImage}
        />
      </View>

      <TouchableOpacity
        style={principalHome.requestButton}
        onPress={openRequestModal}
      >
        <Text style={principalHome.requestButtonText}>Request Appointment</Text>
      </TouchableOpacity>

      <View>
        <Text style={principalHome.sectionTitle}>Today's Schedule</Text>
        {upcomingAppointments.map((schedule) => (
          <ScheduleCard
            key={schedule._id}
            schedule={schedule}
            onPress={handleCardPress}
          />
        ))}
      </View>
    </>
    )
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#F5F8FF" }}>

        <ScrollView contentContainerStyle={principalHome.scrollViewContent}>
          {
            renderHomeContent()
          }
        </ScrollView>


        <MeetingModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          meeting={selectedMeeting}
        />

        <RequestAppointmentModal
          isVisible={isRequestModalVisible}
          onClose={closeRequestModal}
        />
      </View>
    </>
  );
};

const principalHome = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  welcomeCard: {
    backgroundColor: "#3E5793",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  mainImageContainer: {
    alignItems: "center",
    marginTop: -20,
    marginBottom: 10,
  },
  mainImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#fff",
  },
  requestButton: {
    backgroundColor: "#3E5793",
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  requestButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3E5793",
    marginBottom: 20,
  },
  scheduleCard: {
    flexDirection: "row",
    backgroundColor: "#E6E9F0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#A8B3C7",
    alignItems: "center",
  },
  timeContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  endTimeText: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    width: 2,
    height: "100%",
    backgroundColor: "#A8B3C7",
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  meetingSubject: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  meetingDescription: {
    fontSize: 12,
    color: "#555",
  },
  placeholderText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#666",
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
});

export default StaffHomeScreen;