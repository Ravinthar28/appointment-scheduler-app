import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { homeScreenStyles } from './style';
import { ColorSpace } from 'react-native-reanimated';

// ✅ Define appointment type
// interface Appointment {
//   data:{
//         desc:string,
//         dateTime:string
//       }
// }

interface GenerateAppointmentsProps {
      data:{
        desc:string,
        dateTime:string
      }
    }

export default function StaffHomePage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<GenerateAppointmentsProps | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([{
    desc:"Appointments",
    "dateTime":"10:00 Am"
  }]);
  const [pastAppointments, setPastAppointments] = useState([{
    desc:"Appointments",
    "dateTime":"10:00 Am"
  }]);;

  // APPOINTMENT DATA 
  const [appointmentData,setAppointmentData] = useState([{
    "desc":"Appointments",
    "dateTime":"10:00 Am"
  }]);

  const router = useRouter(); // ✅ Initialize router
  const userData = useLocalSearchParams();


  // FUNCTION TO FETCH THE APPOINTMENT DATAS FROM DB
    const fetchAppointmentData = async ()=>{
      try{
        const url = "http://localhost:3000/staff/fetch-appointments";
        const response = await fetch(url,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(userData)
        });
        if(! response.ok) throw new Error("Faild to load data");
        const data = await response.json();
        setUpcomingAppointments(data);
      }
      catch(error){
        console.log(error);
      }
    }

    
    const GenerateAppointments = (props:GenerateAppointmentsProps)=>{
      console.log(props)
      return(
        <TouchableOpacity
          style={homeScreenStyles.card}
          // onPress={() => handleOpenModal()}
        >
          <Image
            source={require('../../assets/images/calendar.jpeg')}
            style={homeScreenStyles.cardImage}
          />
          <View style={homeScreenStyles.cardContent}>
            <Text style={homeScreenStyles.cardTitle}>{"Appointment with principal"}</Text>
            <Text style={homeScreenStyles.cardSubtitle}>{props.data.dateTime}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  
    useEffect(()=>{
      fetchAppointmentData();
    },[]);

  // ✅ For demo: simulate scheduled appointment when screen opens
  // useEffect(() => {
  //   const sample: Appointment = {
  //     title: 'Appointment with Dr. C. Mathalai Sundaram',
  //     time: '10:00 AM - 11:00 AM',
  //     date: 'July 18, 2025',
  //     message: 'Please bring the project proposal.',
  //     datetime: new Date(new Date().getTime() + 5 * 60 * 1000), // 5 minutes from now
  //   };
  //   setUpcomingAppointments([sample]);
  // }, []);

  // ✅ Automatically move finished appointments to 'past'
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     const stillUpcoming: Appointment[] = [];
  //     const newlyPast: Appointment[] = [];

  //     upcomingAppointments.forEach((appt) => {
  //       const apptTime = new Date(appt.datetime);
  //       if (apptTime <= now) {
  //         newlyPast.push(appt);
  //       } else {
  //         stillUpcoming.push(appt);
  //       }
  //     });

  //     if (newlyPast.length > 0) {
  //       setPastAppointments((prev) => [...prev, ...newlyPast]);
  //       setUpcomingAppointments(stillUpcoming);
  //     }
  //   }, 60000); // Check every 60 seconds

  //   return () => clearInterval(interval);
  // }, [upcomingAppointments]);

  const handleOpenModal = (appointment: GenerateAppointmentsProps) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  return (
    <View style={homeScreenStyles.container}>
      <Text style={homeScreenStyles.profileTitle}>Principal Profile</Text>

      <Image
        source={require('../../assets/images/Principal.jpg')}
        style={homeScreenStyles.avatar}
      />
      <Text style={homeScreenStyles.name}>Dr. C. Mathalai Sundaram</Text>
      <Text style={homeScreenStyles.role}>Principal</Text>
      <Text style={homeScreenStyles.email}>principal@nscet.org</Text>

      {/* Request Appointment */}
      <TouchableOpacity
        style={homeScreenStyles.appointmentButton}
        onPress={() => router.push({
          pathname:'./requestPage',
          params:userData
        })} // ✅ Navigate to Request Appointment screen
      >
        <Ionicons name="add" size={18} color="white" style={{ marginRight: 6 }} />
        <Text style={homeScreenStyles.appointmentText}>Request Appointment</Text>
      </TouchableOpacity>

      {/* Tabs */}

      <View style={homeScreenStyles.tabs}>
        <TouchableOpacity
          onPress={() => setSelectedTab('upcoming')}
          style={[
            homeScreenStyles.tabButton,
            selectedTab === 'upcoming' && homeScreenStyles.tabSelected,
          ]}
        >
          <Text
            style={
              selectedTab === 'upcoming'
                ? homeScreenStyles.tabTextSelected
                : homeScreenStyles.tabText
            }
          >
            Upcoming Appointments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab('past')}
          style={[
            homeScreenStyles.tabButton,
            selectedTab === 'past' && homeScreenStyles.tabSelected,
          ]}
        >
          <Text
            style={
              selectedTab === 'past'
                ? homeScreenStyles.tabTextSelected
                : homeScreenStyles.tabText
            }
          >
            Past Appointments
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointment Cards */}
      
      {(selectedTab === 'upcoming' ? upcomingAppointments : pastAppointments).map((data, index) => (
        <GenerateAppointments data={data} />
        // <TouchableOpacity
        //   key={index}
        //   style={homeScreenStyles.card}
        //   onPress={() => handleOpenModal(appt)}
        // >
        //   <Image
        //     source={require('../../assets/images/calendar.jpeg')}
        //     style={homeScreenStyles.cardImage}
        //   />
        //   <View style={homeScreenStyles.cardContent}>
        //     <Text style={homeScreenStyles.cardTitle}>{appt.title}</Text>
        //     <Text style={homeScreenStyles.cardSubtitle}>{appt.time}</Text>
        //   </View>
        // </TouchableOpacity>
      ))}

      {/* Modal */}
      {/* <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={homeScreenStyles.modalOverlay}>
          <View style={homeScreenStyles.modalContainer}>
            <Text style={homeScreenStyles.modalTitle}>Appointment Details</Text>
            <Text style={homeScreenStyles.modalLabel}>Date:</Text>
            <Text style={homeScreenStyles.modalText}>{selectedAppointment?.date}</Text>
            <Text style={homeScreenStyles.modalLabel}>Time:</Text>
            <Text style={homeScreenStyles.modalText}>{selectedAppointment?.time}</Text>
            <Text style={homeScreenStyles.modalLabel}>Message:</Text>
            <Text style={homeScreenStyles.modalText}>
              {selectedAppointment?.message || 'No message'}
            </Text>

            <TouchableOpacity
              style={homeScreenStyles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={homeScreenStyles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}
