import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { baseUrl } from '../apiUrl';
import NoNewAppointmentsScreen from './no_appointment';

// Define the same interface here as in PrincipalDashboard.js
// This ensures type safety across components.
interface MeetingData {
  id: string;
  staffName: string;
  staffEmail: string;
  reason: string;
  date: string;
  time: string;
}

// Define props for this component, including the onPressMeeting function
interface PendingAppointmentsScreenProps {
  email?: string | string[];
  collegeCode?: string | string[];
  selectedTab: string;
  onPressMeeting: (meeting: MeetingData) => void;
}

// The component is now correctly typed to accept all props, including onPressMeeting
const PendingAppointmentsScreen = ({ email, collegeCode, onPressMeeting }: PendingAppointmentsScreenProps) => {
  const [pendingAppointments, setPendingAppointments] = useState<MeetingData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // FUNCTION TO FETCH THE REQUESTS DATA FROM THE DB
  const fetchRequest = async () => {
    try {
      const url = `${baseUrl}/principal/pending-appointments`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, collegeCode }),
      });
      const result = await response.json();
      // Assuming the API returns data that matches the MeetingData interface
      setPendingAppointments(result.pendingAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  // refresh control function
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequest();
    setRefreshing(false);
  };

  // The AppointmentCard component is now a TouchableOpacity
  const AppointmentCard = ({
    id,
    staffName,
    staffEmail,
    reason,
    date,
    time,
  }: MeetingData) => (
    <TouchableOpacity
      style={styles.card}
      // When pressed, call the onPressMeeting function with the correct data structure
      onPress={() => onPressMeeting({ id, staffName, staffEmail, reason, date, time })}
    >
      <View style={styles.cardHeader}>
        <Image
          source={require('../../assets/images/profile.png')}
          style={styles.staffAvatar}
        />
        <View style={styles.cardTitleContainer}>
          <Text style={styles.staffName}>{staffName}</Text>
          <Text style={styles.staffEmail}>{staffEmail}</Text>
        </View>
        <TouchableOpacity style={styles.settingsIcon}>
          <Feather name="settings" size={20} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.subTitle}>Reason:</Text>
        <Text style={styles.subText}>{reason}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchRequest();
  }, []);

  function AppointmentScreen() {
    return (
      <ScrollView style={styles.listContainer}>
        {pendingAppointments.map(appointment => (
          <AppointmentCard key={appointment.id} {...appointment} />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Appointments</Text>
      {pendingAppointments.length === 0 ? <NoNewAppointmentsScreen /> : <AppointmentScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E5793',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 80, // Adds space for the bottom nav bar
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
});

export default PendingAppointmentsScreen;