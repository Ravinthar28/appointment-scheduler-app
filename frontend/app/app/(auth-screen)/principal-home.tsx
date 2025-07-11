import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

export default function PrincipalHomePage() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'confirmed' | 'past'>('pending');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Appointments</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['pending', 'confirmed', 'past'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.tabSelected,
            ]}
            onPress={() => setSelectedTab(tab as typeof selectedTab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextSelected,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Appointments (Sample Data) */}
      <View style={styles.appointmentList}>
        {[
          { name: 'Dr. Anya Sharma', time: '10:00 AM – 11:00 AM' },
          { name: 'Mr. Ethan', time: '2:00 PM – 3:00 PM' },
          { name: 'Ms. Olivia Bennett', time: '3:30 PM – 4:30 PM' },
        ].map((appt, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardName}>Meeting with {appt.name}</Text>
              <Text style={styles.cardTime}>{appt.time}</Text>
            </View>
            <View style={styles.statusDot} />
          </View>
        ))}
      </View>

      {/* Time Selection Form */}
      <Text style={styles.formHeading}>Select Available Time</Text>
      <TextInput placeholder="Date" placeholderTextColor="#888" style={styles.input} />
      <TextInput placeholder="Time" placeholderTextColor="#888" style={styles.input} />
      <TextInput
        placeholder="Optional Message"
        placeholderTextColor="#888"
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
