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

// STYLES
import { registerStyles } from './style';

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

  };

  return (
    <ScrollView contentContainerStyle={registerStyles.container} showsVerticalScrollIndicator={false}>
      <Text style={registerStyles.heading}>Personal Information</Text>

      {/* Full Name */}
      <View style={registerStyles.inputBox}>
        <Text style={registerStyles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          placeholderTextColor="#ccc"
          value={fullName}
          onChangeText={setFullName}
          style={registerStyles.input}
        />
      </View>

      {/* Email */}
      <View style={registerStyles.inputBox}>
        <Text style={registerStyles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={registerStyles.input}
        />
      </View>

      {/* Phone Number */}
      <View style={registerStyles.inputBox}>
        <Text style={registerStyles.label}>Phone Number</Text>
        <TextInput
          placeholder="Enter your phone number"
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={registerStyles.input}
        />
      </View>

      {/* College Code */}
      <View style={registerStyles.inputBox}>
        <Text style={registerStyles.label}>College Code</Text>
        <TextInput
          placeholder="Enter college code"
          placeholderTextColor="#ccc"
          value={collegeCode}
          onChangeText={setCollegeCode}
          style={registerStyles.input}
        />
      </View>

      {/* Role Toggle */}
      <Text style={registerStyles.label}>Select Role</Text>
      <View style={registerStyles.toggleContainer}>
        <TouchableOpacity
          style={[registerStyles.toggleButton, selectedRole === 'staff' && registerStyles.toggleSelected]}
          onPress={() => setSelectedRole('staff')}
        >
          <Text style={selectedRole === 'staff' ? registerStyles.toggleTextSelected : registerStyles.toggleText}>
            Staff
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[registerStyles.toggleButton, selectedRole === 'principal' && registerStyles.toggleSelected]}
          onPress={() => setSelectedRole('principal')}
        >
          <Text style={selectedRole === 'principal' ? registerStyles.toggleTextSelected : registerStyles.toggleText}>
            Principal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={registerStyles.nextButton} onPress={handleNext}>
        <Text style={registerStyles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
