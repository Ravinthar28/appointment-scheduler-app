import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For the background gradient
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; // For icons
import { useRouter } from 'expo-router';

export default function PrincipalDashboard() {
   const router = useRouter();
  
  const scheduleItems = [
    {
      timeStart: '11:30',
      timeEnd: '13:00',
      type: 'Meeting',
      title: 'Discussion with Placement Cell',
      details: 'Discussion about upcoming company recruitment',
    },
    {
      timeStart: '14:00',
      timeEnd: '15:00',
      type: 'Meeting',
      title: 'Discussion with CS HOD',
      details: 'Discussion about ongoing app project',
    },
    {
      timeStart: '17:00',
      timeEnd: '17:30',
      type: 'Meeting',
      title: 'Discussion with Civil HOD',
      details: 'Discussion about ongoing app project',
    },
    {
      timeStart: '17:30',
      timeEnd: '18:00',
      type: 'Meeting',
      title: 'Discussion with CS HOD',
      details: 'Discussion about ongoing app project',
    },
    // You can add more schedule items here
  ];

  return (
    <LinearGradient
      colors={['#E0E8F7', '#F0F4F9']} // Light blue/grey gradient for background
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require('../../assets//images//profile.png')} // Replace with your image path
          style={styles.profilePic}
        />
        <TouchableOpacity>
          <Ionicons name="log-out-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome Principal !!</Text>
        <Text style={styles.welcomeDescription}>
          Lorem ipsum dolor sit amet consectetur. Sit adipiscing gravida in faucibus.
        </Text>
      </View>

      <Text style={styles.todayScheduleText}>Today's Schedule</Text>

      <ScrollView contentContainerStyle={styles.scheduleList}>
        {scheduleItems.map((item, index) => (
          <View key={index} style={styles.scheduleItemCard}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeStart}>{item.timeStart}</Text>
              <Text style={styles.timeEnd}>{item.timeEnd}</Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.detailsContainer}>
              <Text style={styles.meetingType}>{item.type}</Text>
              <Text style={styles.meetingTitle}>{item.title}</Text>
              <Text style={styles.meetingDetails}>{item.details}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}
        onPress={() => router.push('/pending_appointments')}>
          <MaterialCommunityIcons name="history" size={28} color="#A7B7DC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}
          onPress={() => router.push('/confirm_appointments')}>
          <Ionicons name="checkmark-circle-outline" size={28} color="#A7B7DC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}
        onPress={() => router.push('/cancel_appointment')}>
          <FontAwesome name="calendar" size={28} color="#A7B7DC" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Adjust for status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#3E5793', // Dark blue background for header to match design
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  welcomeCard: {
    backgroundColor: '#3E5793', // Dark blue
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  welcomeDescription: {
    fontSize: 14,
    color: '#E0E8F7',
    lineHeight: 20,
  },
  todayScheduleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
  },
  scheduleList: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for bottom nav bar
  },
  scheduleItemCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timeContainer: {
    alignItems: 'flex-end',
    marginRight: 15,
  },
  timeStart: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timeEnd: {
    fontSize: 14,
    color: '#888',
  },
  verticalLine: {
    width: 4,
    height: '100%',
    backgroundColor: '#3E5793', // Dark blue
    borderRadius: 2,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  meetingType: {
    fontSize: 13,
    color: '#888',
    marginBottom: 3,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  meetingDetails: {
    fontSize: 13,
    color: '#666',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3E5793', // Dark blue
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
  },
  navItem: {
    padding: 10,
  },
});