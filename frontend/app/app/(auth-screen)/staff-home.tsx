import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { staffhomepageStyles } from './style'; 

export default function StaffHomePage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <View style={staffhomepageStyles.container}>
      {/* Header */}
      <TouchableOpacity style={staffhomepageStyles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={staffhomepageStyles.profileTitle}>Principal Profile</Text>

      {/* Profile */}
      <Image
        source={require('../../assets/images/Principal.jpg')}
        style={staffhomepageStyles.avatar}
      />
      <Text style={staffhomepageStyles.name}>Dr. C. Mathalai Sundaram</Text>
      <Text style={staffhomepageStyles.role}>Principal</Text>
      <Text style={staffhomepageStyles.email}>principal@nscet.org</Text>

      {/* Request Button */}
      <TouchableOpacity style={staffhomepageStyles.appointmentButton}>
        <Ionicons name="add" size={18} color="white" style={{ marginRight: 6 }} />
        <Text style={staffhomepageStyles.appointmentText}>Request Appointment</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={staffhomepageStyles.tabs}>
        <TouchableOpacity
          onPress={() => setSelectedTab('upcoming')}
          style={[
            staffhomepageStyles.tabButton,
            selectedTab === 'upcoming' && staffhomepageStyles.tabSelected,
          ]}
        >
          <Text
            style={
              selectedTab === 'upcoming'
                ? staffhomepageStyles.tabTextSelected
                : staffhomepageStyles.tabText
            }
          >
            Upcoming Appointments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('past')}
          style={[
            staffhomepageStyles.tabButton,
            selectedTab === 'past' && staffhomepageStyles.tabSelected,
          ]}
        >
          <Text
            style={
              selectedTab === 'past'
                ? staffhomepageStyles.tabTextSelected
                : staffhomepageStyles.tabText
            }
          >
            Past Appointments
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointment Card */}
      {selectedTab === 'upcoming' && (
        <View style={staffhomepageStyles.card}>
          <Image
            source={require('../../assets/images/calendar.jpeg')}
            style={staffhomepageStyles.cardImage}
          />
          <View style={staffhomepageStyles.cardContent}>
            <Text style={staffhomepageStyles.cardTitle}>Appointment with Dr. C. Mathalai Sundaram</Text>
            <Text style={staffhomepageStyles.cardSubtitle}>10:00 AM - 11:00 AM</Text>
          </View>
        </View>
      )}
    </View>
  );
}
