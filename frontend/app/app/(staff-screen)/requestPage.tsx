import React, { useState } from 'react';
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