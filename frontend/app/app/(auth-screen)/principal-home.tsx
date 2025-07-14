import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';


interface Meeting {
  id: number;
  name: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'past';
  message?: string;
}

export default function PrincipalHomePage() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'confirmed' | 'past'>('pending');
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      name: 'Dr. Anya Sharma',
      date: new Date(new Date().getTime() + 3600000), // 1hr from now
      status: 'pending',
    },
    {
      id: 2,
      name: 'Mr. Ethan',
      date: new Date(new Date().getTime() + 7200000), // 2hr from now
      status: 'confirmed',
    },
    {
      id: 3,
      name: 'Ms. Olivia Bennett',
      date: new Date(new Date().getTime() - 3600000), // 1hr ago
      status: 'confirmed',
    },
  ]);

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [message, setMessage] = useState('');

  // Automatically move confirmed to past
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setMeetings((prev) =>
        prev.map((meeting) =>
          meeting.status === 'confirmed' && meeting.date < now
            ? { ...meeting, status: 'past' }
            : meeting
        )
      );
    }, 60000); // every minute

    return () => clearInterval(interval);
  }, []);

  const handleConfirm = () => {
    if (!selectedMeeting) return;
    const updated = meetings.map((m) =>
      m.id === selectedMeeting.id
        ? {
            ...m,
            date: tempDate,
            status: 'confirmed',
            message,
          }
        : m
    );
    Alert.alert('Appointment Allocated', 'The appointment has been confirmed.');
    setSelectedMeeting(null);
    setMessage('');
  };

  const toggleStatusWithEmoji = (id: number) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === id && m.status !== 'past'
          ? {
              ...m,
              status: m.status === 'pending' ? 'confirmed' : 'pending',
            }
          : m
      )
    );
  };

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
            style={[styles.tabButton, selectedTab === tab && styles.tabSelected]}
            onPress={() => setSelectedTab(tab as typeof selectedTab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextSelected]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Meeting Cards */}
      {meetings
        .filter((m) => m.status === selectedTab)
        .map((meeting) => (
          <TouchableOpacity
            key={meeting.id}
            style={styles.card}
            onPress={() => {
              if (meeting.status !== 'past') {
                setSelectedMeeting(meeting);
                setTempDate(meeting.date);
              }
            }}
          >
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardName}>Meeting with {meeting.name}</Text>
              <Text style={styles.cardTime}>
                {meeting.date.toLocaleDateString()} –{' '}
                {meeting.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              {meeting.message && <Text style={styles.cardMessage}>{meeting.message}</Text>}
            </View>
            {meeting.status !== 'past' && (
              <TouchableOpacity onPress={() => toggleStatusWithEmoji(meeting.id)}>
                <Text style={{ fontSize: 22 }}>
                  {meeting.status === 'pending' ? '⏳' : '✅'}
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}

      {/* Modal */}
      <Modal visible={!!selectedMeeting} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.formHeading}>Select Available Time</Text>

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{tempDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={tempDate}
                minimumDate={new Date()}
                onChange={(e, date) => {
                  setShowDatePicker(false);
                  if (date) setTempDate(date);
                }}
              />
            )}

            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
              <Text>
                {tempDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={tempDate}
                onChange={(e, time) => {
                  setShowTimePicker(false);
                  if (time)
                    setTempDate(
                      new Date(tempDate.setHours(time.getHours(), time.getMinutes()))
                    );
                }}
              />
            )}

            <TextInput
              placeholder="Optional Message"
              value={message}
              onChangeText={setMessage}
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedMeeting(null)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
