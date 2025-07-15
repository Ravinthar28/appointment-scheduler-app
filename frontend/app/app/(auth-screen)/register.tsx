import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerStyles } from './style';

const { width } = Dimensions.get('window');

export default function PersonalInfoForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeCode, setCollegeCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'staff' | 'principal' | ''>('');

  const handleNext = async () => {
    if (!fullName || !email || !phone || !collegeCode || !password || !selectedRole) {
      Alert.alert('Validation Error', 'Please fill in all the fields.');
      return;
    }

    try {
      const userData = {
        fullName,
        email,
        phone,
        collegeCode,
        password,
        role: selectedRole,
      };
      const url = "http://192.168.48.146:3000/auth/register";
      const response = await fetch(url,{
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify({userData})
      })
      if(! response.ok){
        throw new Error("Failed to fetch teh data");
      }
      const result =  await response.json()
      if(result) router.push('/(auth-screen)/login')
    //   const usersData = await AsyncStorage.getItem('registeredUsers');
    //   const users = usersData ? JSON.parse(usersData) : [];

    //   const emailExists = users.some((user: any) => user.email === email);
    //   if (emailExists) {
    //     Alert.alert('Already Registered', 'This email is already registered.');
    //     return;
    //   }

    //   users.push(userData);
    //   await AsyncStorage.setItem('registeredUsers', JSON.stringify(users));

    //   Alert.alert('Registration Successful', 'You can now log in.', [
    //     {
    //       text: 'OK',
    //       onPress: () => router.push('/login'),
    //     },
    //   ]);
    // } catch (error) {
    //   console.error(error);
    //   Alert.alert('Error', 'Failed to register. Please try again.');
    }
    catch (error){
      console.log(error);
    }
    
  };

  const isFormValid =
    fullName && email && phone && collegeCode && password && selectedRole;

  return (
    <ScrollView contentContainerStyle={registerStyles.container} showsVerticalScrollIndicator={false}>
      <Text style={registerStyles.heading}>Personal Information</Text>

      {/* Full Name */}
      <View style={registerStyles.inputBox}>
        <Text style={registerStyles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your fullname"
          placeholderTextColor="#ccc"
          style={registerStyles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Email */}
      <View style={registerStyles.inputBox}>
        <Text style={registerStyles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          style={registerStyles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Phone */}
      <View style={registerStyles.inputBox}>
        <Text style={registerStyles.label}>Phone Number</Text>
        <TextInput
          placeholder="Enter your phone number"
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
          style={registerStyles.input}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* College Code */}
      <View style={registerStyles.inputBox}>
        <Text style={registerStyles.label}>College Code</Text>
        <TextInput
          placeholder="Enter college code"
          placeholderTextColor="#ccc"
          style={registerStyles.input}
          value={collegeCode}
          onChangeText={setCollegeCode}
        />
      </View>

      {/* Password */}
      <View style={registerStyles.inputBox}>
        <Text style={registerStyles.label}>Password</Text>
        <View style={registerStyles.passwordWrapper}>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showPassword}
            style={[registerStyles.input, { flex: 1 }]}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Role Selection */}
      <Text style={registerStyles.label}>Select Role</Text>
      <View style={registerStyles.toggleContainer}>
        <TouchableOpacity
          style={[
            registerStyles.toggleButton,
            selectedRole === 'staff' && registerStyles.toggleSelected,
          ]}
          onPress={() => setSelectedRole('staff')}
        >
          <Text
            style={
              selectedRole === 'staff'
                ? registerStyles.toggleTextSelected
                : registerStyles.toggleText
            }
          >
            Staff
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            registerStyles.toggleButton,
            selectedRole === 'principal' && registerStyles.toggleSelected,
          ]}
          onPress={() => setSelectedRole('principal')}
        >
          <Text
            style={
              selectedRole === 'principal'
                ? registerStyles.toggleTextSelected
                : registerStyles.toggleText
            }
          >
            Principal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          registerStyles.nextButton,
          !isFormValid && { backgroundColor: '#555' },
        ]}
        onPress={handleNext}
        disabled={!isFormValid}
      >
        <Text style={registerStyles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
