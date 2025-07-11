import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { appointmentstyles } from './style';

export default function RequestAppointmentScreen() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setDate(selectedTime);
  };

  const handleSchedule = () => {
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter appointment details.');
      return;
    }
    Alert.alert('Appointment Scheduled', `On ${date.toLocaleString()}`);
    // You can send to backend here
  };

  return (
    <ScrollView contentContainerStyle={appointmentstyles.container}>
      {/* Header */}
      <Text style={appointmentstyles.heading}>New Appointment</Text>

      {/* Description Box */}
      <TextInput
        style={appointmentstyles.input}
        placeholder="Enter appointment details"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      {/* Date Picker */}
      <Text style={appointmentstyles.label}>Date</Text>
      <TouchableOpacity
        style={appointmentstyles.selector}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={appointmentstyles.selectorText}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={onChangeDate}
        />
      )}

      {/* Time Picker */}
      <Text style={appointmentstyles.label}>Time</Text>
      <TouchableOpacity
        style={appointmentstyles.selector}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={appointmentstyles.selectorText}>
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
      <TouchableOpacity style={appointmentstyles.button} onPress={handleSchedule}>
        <Text style={appointmentstyles.buttonText}>Schedule</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}