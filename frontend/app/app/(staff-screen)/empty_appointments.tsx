import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const NoAppointmentsScreen = () => {
  return (
    <SafeAreaView style={noAppointments.safeArea}>
      <View style={noAppointments.container}>
        <View style={noAppointments.header}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={noAppointments.profileImage}
          />
        </View>

        <View style={noAppointments.welcomeCard}>
          <Text style={noAppointments.welcomeTitle}>Welcome Staff !!</Text>
        </View>

        <View style={noAppointments.mainImageContainer}>
          <Image
            source={require('../../assets/images/Principal.jpg')}
            style={noAppointments.mainImage}
          />
        </View>

        <TouchableOpacity style={noAppointments.requestButton}>
          <Text style={noAppointments.requestButtonText}>Request Appointment</Text>
        </TouchableOpacity>

        <View style={noAppointments.noAppointmentsContainer}>
          <Text style={noAppointments.noAppointmentsText}>no appointments lined up</Text>
          <Image
            source={require('../../assets/images/thumbnail.png')}
            style={noAppointments.noAppointmentsImage}
          />
        </View>
      </View>

      <View style={noAppointments.navBar}>
        <TouchableOpacity style={noAppointments.navItem}
        onPress={() => router.push("/new_index")}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={noAppointments.navItem}>
          <Ionicons name="time-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={noAppointments.navItem}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={noAppointments.navItem}
        onPress={() => router.push("/(auth-screen)/login_new")}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const noAppointments = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeCard: {
    backgroundColor: '#3E5793',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  mainImageContainer: {
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 10,
  },
  mainImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#fff',
  },
  requestButton: {
    backgroundColor: '#3E5793',
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noAppointmentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAppointmentsText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  noAppointmentsImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
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
});

export default NoAppointmentsScreen;