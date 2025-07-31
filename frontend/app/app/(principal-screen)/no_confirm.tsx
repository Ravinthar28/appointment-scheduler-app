import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const NewAppointmentsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/profile.png')} // Replace with your profile picture URI
            style={styles.profileImage}
          />

       <TouchableOpacity
       onPress={() => router.push('/(auth-screen)/login')}>
          <Ionicons name="log-out-outline" size={30} color="#fff" />
        </TouchableOpacity>
        </View>

        <Text style={styles.title}>Confirmed appointments</Text>

        <View style={styles.content}>
          <Image
            source={require('../../assets/images/thumbnail.png')} // Replace with your illustration URI
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.noAppointmentsText}>no confirmed appointments</Text>
        </View>
        
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home-outline" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <Ionicons name="time-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome5 name="check-circle" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="calendar-outline" size={24} color="#555" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    backgroundColor:'#3E5793'
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
    color: '#0D358E',
    marginBottom: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '80%',
    height: 200,
    marginBottom: 20,
  },
  noAppointmentsText: {
    fontSize: 16,
    color: '#888',
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

export default NewAppointmentsScreen;