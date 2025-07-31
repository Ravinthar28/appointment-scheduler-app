import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const ConfirmedAppointmentsScreen = () => {
  // Dummy data for the list of confirmed appointments
  const confirmedAppointments = [
    { id: '1', name: 'Staff-1', email: 'staffone@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Staff-2', email: 'stafftwo@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Staff-3', email: 'staffthree@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Staff-4', email: 'stafffour@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Staff-5', email: 'stafffive@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
    { id: '6', name: 'Staff-6', email: 'staffsix@gmail.com', subText: 'Lorem ipsum dolor sit amet consectetur. Gravida sed at in pellentesque', avatar: 'https://via.placeholder.com/150' },
  ];

  const AppointmentCard = ({ appointment }: { appointment: typeof confirmedAppointments[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: appointment.avatar }}
          style={styles.staffAvatar}
        />
        <View style={styles.cardTitleContainer}>
          <Text style={styles.staffName}>{appointment.name}</Text>
          <Text style={styles.staffEmail}>{appointment.email}</Text>
        </View>
        <TouchableOpacity style={styles.settingsIcon}>
          <Feather name="settings" size={20} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.subTitle}>Sub:</Text>
        <Text style={styles.subText}>{appointment.subText}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Text style={styles.title}>Confirmed Appointments:</Text>

        <ScrollView style={styles.listContainer}>
          {confirmedAppointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8FF', // Main background color
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
    backgroundColor:'#3E5793',
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
  },
  listContainer: {
    flex: 1,
    // Add padding bottom to make sure the last item is not covered by the nav bar
    marginBottom: 80,
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

export default ConfirmedAppointmentsScreen;