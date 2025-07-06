import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PersonalInfoForm() {
  const router = useRouter();

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeCode, setCollegeCode] = useState('');
  const [selectedRole, setSelectedRole] = useState<'staff' | 'principal' | null>(null);

  // Handler
  const handleNext = () => {
    if (!fullName || !email || !phone || !collegeCode || !selectedRole) {
      Alert.alert('Missing Information', 'Please fill out all fields before proceeding.');
      return;
    }

    router.push('/login-form');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Personal Information</Text>

      {/* Full Name */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          placeholderTextColor="#ccc"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
      </View>

      {/* Email */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      {/* Phone Number */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="Enter your phone number"
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
      </View>

      {/* College Code */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>College Code</Text>
        <TextInput
          placeholder="Enter college code"
          placeholderTextColor="#ccc"
          value={collegeCode}
          onChangeText={setCollegeCode}
          style={styles.input}
        />
      </View>

      {/* Role Toggle */}
      <Text style={styles.label}>Select Role</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedRole === 'staff' && styles.toggleSelected]}
          onPress={() => setSelectedRole('staff')}
        >
          <Text style={selectedRole === 'staff' ? styles.toggleTextSelected : styles.toggleText}>
            Staff
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedRole === 'principal' && styles.toggleSelected]}
          onPress={() => setSelectedRole('principal')}
        >
          <Text style={selectedRole === 'principal' ? styles.toggleTextSelected : styles.toggleText}>
            Principal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0c10',
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
  },
  inputBox: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 15,
  },
  input: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    width: '100%',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '100%',
    maxWidth: 350,
  },
  toggleButton: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  toggleSelected: {
    backgroundColor: '#2d2e30',
  },
  toggleText: {
    color: '#ccc',
    fontWeight: '600',
    fontSize: 14,
  },
  toggleTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  nextButton: {
    backgroundColor: '#b0cdee',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#0b0c10',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
