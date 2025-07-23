import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
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

interface appointments {
    collegeCode:string,
    _id:string,
    userName: string;
    userEmail:string
    desc: string;
    dateTime: Date;
  }

export default function StaffHomePage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing,setRefreshing] =  useState(false);

  const dataTemplate = {
      _id:"",
      collegeCode:"",
      userName: "",
      userEmail:"",
      desc: "",
      dateTime: new Date(),
    }
  const [selectedAppointment, setSelectedAppointment] = useState(dataTemplate);

  const [upcomingAppointments, setUpcomingAppointments] = useState([dataTemplate]);
  const [pastAppointments, setPastAppointments] = useState([dataTemplate]);;

  // APPOINTMENT DATA 
  // const [appointmentData,setAppointmentData] = useState([dataTemplate]);

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
    
    const GenerateAppointments = ({collegeCode,_id,userName,userEmail,desc,dateTime}:appointments)=>{
      return(
        <TouchableOpacity
          style={homeScreenStyles.card}
          onPress={() => handleOpenModal({collegeCode,_id,userName,userEmail,desc,dateTime})}
        >
          <Image
            source={require('../../assets/images/calendar.jpeg')}
            style={homeScreenStyles.cardImage}
          />
          <View style={homeScreenStyles.cardContent}>
            <Text style={homeScreenStyles.cardTitle}>{"Appointment with principal"}</Text>
            <Text style={homeScreenStyles.cardSubtitle}>{extractDateTime(dateTime)}</Text>
          </View>
        </TouchableOpacity>
      )
    }

        const handleRefresh = async () => {
      setRefreshing(true);
      await fetchAppointmentData();
      setRefreshing(false);
    };


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

  const handleOpenModal = ({collegeCode,_id,userName,userEmail,desc,dateTime}: appointments) => {
    setSelectedAppointment({collegeCode,_id,userName,userEmail,desc,dateTime});
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
        onPress={() => {
          router.push({
          pathname:'./requestPage',
          params:userData
        });
        // console.log(userData);
        }} // ✅ Navigate to Request Appointment screen
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

      {/* Appointment Cards refreshing */}
      <ScrollView
      style={{ flex: 1 }}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  }
>
  {selectedTab === 'upcoming' &&
    upcomingAppointments.map((appointments) => (
      <GenerateAppointments
        key={appointments._id}
        collegeCode={appointments.collegeCode}
        _id={appointments._id}
        userName={appointments.userName}
        userEmail={appointments.userEmail}
        desc={appointments.desc}
        dateTime={appointments.dateTime}
      />
    ))}
</ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={homeScreenStyles.modalOverlay}>
          <View style={homeScreenStyles.modalContainer}>
            <Text style={homeScreenStyles.modalTitle}>Appointment Details</Text>
            <Text style={homeScreenStyles.modalLabel}>Date & Time:</Text>
            <Text style={homeScreenStyles.modalText}>{extractDateTime(selectedAppointment?.dateTime || new Date())}</Text>
            <Text style={homeScreenStyles.modalLabel}>Message:</Text>
            <Text style={homeScreenStyles.modalText}>
              {selectedAppointment?.desc || 'No message'}
            </Text>

            <TouchableOpacity
              style={homeScreenStyles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={homeScreenStyles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
