import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { appointmentStyles } from './style';
import { useLocalSearchParams, useRouter } from 'expo-router'; // ✅ Import router
import { baseUrl } from '../apiUrl';

export default function RequestAppointmentScreen() {
  const router = useRouter(); // ✅ Initialize router
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // PARAMETERS
  const userData = useLocalSearchParams();

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setDate(selectedTime);
  };


  // FUNCTION TO VALIDATE THE APPOINTMENT FORM AND TO STORE IT IN THE DB
  const handleSchedule = async () => {

    if (!description.trim()) {
      alert(`Validation Error Please enter appointment details`);
      return;
    }
    console.log(userData);

    Alert.alert('Appointment Scheduled', `On ${date.toLocaleString()}`, [
      {
        text: 'OK',
        onPress: () => {
          // ✅ Navigate to staff home after scheduling
          router.push({
            pathname:'/(staff-screen)/home',
            params:userData
          });
        },
      },
    ]);

    try{
      const messageData = {
        email:userData.email,
        collegeCode:userData.collegeCode,
        desc:description,
        dateTime:date
      }
      const url = `${baseUrl}/principal/appointment-request`;
      const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(messageData)
      });
      if(! response.ok) throw new Error("Faild to save the message");
      alert('Request sent to the principal successfully');
      router.push({
        pathname:'/(staff-screen)/home',
        params:userData
      });
    }
    catch(error){
      alert('Error in requesting');
      console.log(error);
    }
    
  };

  return (
    <ScrollView contentContainerStyle={appointmentStyles.container}>
      {/* Header */}
      <Text style={appointmentStyles.heading}>New Appointment</Text>

      {/* Description Box */}
      <TextInput
        style={appointmentStyles.input}
        placeholder="Enter appointment details"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      {/* Date Picker */}
      <Text style={appointmentStyles.label}>Date</Text>
      <TouchableOpacity
        style={appointmentStyles.selector}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={appointmentStyles.selectorText}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={onChangeDate}
          minimumDate={new Date()} 
        />
      )}

      {/* Time Picker */}
      <Text style={appointmentStyles.label}>Time</Text>
      <TouchableOpacity
        style={appointmentStyles.selector}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={appointmentStyles.selectorText}>
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={date}
          onChange={onChangeTime}
        />
      )}

      {/* Submit Button */}
      <TouchableOpacity style={appointmentStyles.button} onPress={handleSchedule}>
        <Text style={appointmentStyles.buttonText}>Schedule</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
