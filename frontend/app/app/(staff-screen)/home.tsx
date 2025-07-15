import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // ✅ Added for navigation
import { useLocalSearchParams } from 'expo-router';

// STYLES
import { homeScreenStyles } from './style';


export default function StaffHomePage() {

  // STATES
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [userName,setUserName] = useState('');

  const router = useRouter(); // ✅ Initialize router
  const {email,collegeCode} = useLocalSearchParams();

  async function fetchData() {
    const userData = {
      email,
      collegeCode
    }
    try{
      const url = "http://localhost:3000/staff/fetch-staff-data"
      const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(userData)
      });
      if(! response.ok) throw new Error ("Faild to Load");
      const responseData = await(response.json());
      setUserName(responseData.response);

    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[]);

  return (
    <View style={homeScreenStyles.container}>
      {/* Header */}
      
      {/* <TouchableOpacity style={homeScreenStyles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity> */}

      <Text style={homeScreenStyles.profileTitle}>Principal Profile</Text>

      {/* Profile */}
      <Image
        source={require('../../assets/images/Principal.jpg')}
        style={homeScreenStyles.avatar}
      />
      <Text style={homeScreenStyles.name}>Dr. C. Mathalai Sundaram</Text>
      <Text style={homeScreenStyles.role}>Principal</Text>
      <Text style={homeScreenStyles.email}>principal@nscet.org</Text>

      {/* Request Button */}
      <TouchableOpacity
        style={homeScreenStyles.appointmentButton}
        onPress={() => router.push('./requestPage')} // ✅ Navigate to Request Appointment screen
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

      {/* Appointment Card */}
      {selectedTab === 'upcoming' && (
        <View style={homeScreenStyles.card}>
          <Image
            source={require('../../assets/images/calendar.jpeg')}
            style={homeScreenStyles.cardImage}
          />
          <View style={homeScreenStyles.cardContent}>
            <Text style={homeScreenStyles.cardTitle}>
              Appointment with Dr. C. Mathalai Sundaram
            </Text>
            <Text style={homeScreenStyles.cardSubtitle}>10:00 AM - 11:00 AM</Text>
          </View>
        </View>
      )}
    </View>
  );
}
