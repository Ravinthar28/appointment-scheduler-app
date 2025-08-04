import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

// Dummy data for today's schedule
const todaySchedule = [
  {
    id: "1",
    time: "11:30",
    endTime: "13:00",
    type: "Meeting",
    title: "Discussion with Placement Cell",
    description: "Discussion about upcoming company recruitment",
  },
  {
    id: "2",
    time: "14:00",
    endTime: "15:00",
    type: "Meeting",
    title: "Discussion with CS HOD",
    description: "Discussion about ongoing app project",
  },
  {
    id: "3",
    time: "17:00",
    endTime: "18:00",
    type: "Meeting",
    title: "Discussion with Civil HOD",
    description: "Discussion about ongoing app project",
  },
];

interface MeetingDetails {
  id: string;
  time: string;
  endTime: string;
  type: string;
  title: string;
  description: string;
}

interface MeetingModalProps {
  isVisible: boolean;
  onClose: () => void;
  meeting: MeetingDetails | null;
}

const MeetingModal = ({ isVisible, onClose, meeting }: MeetingModalProps) => {
  if (!meeting) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <View style={modalStyles.modalHeader}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={modalStyles.modalAvatar}
            />
            <Text style={modalStyles.modalStaffName}>Staff-3</Text>
            <Text style={modalStyles.modalStaffEmail}>staffmail@gmail.com</Text>
          </View>
          <View style={modalStyles.modalContent}>
            <Text
              style={modalStyles.modalTime}
            >{`${meeting.time} - ${meeting.endTime}`}</Text>
            <Text style={modalStyles.modalDescription}>
              {meeting.description}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const RequestAppointmentModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [meetingDate, setMeetingDate] = useState<Date>(new Date());
  const [reason, setReason] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setMeetingDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      const newDate = new Date(
        meetingDate.setHours(selectedTime.getHours(), selectedTime.getMinutes())
      );
      setMeetingDate(newDate);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  const handleRequestAppointment = () => {
    console.log("Appointment Requested:");
    console.log("Reason:", reason);
    console.log("Date:", formatDate(meetingDate));
    console.log("Time:", formatTime(meetingDate));
    setReason("");
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/Principal.jpg")}
            style={modalStyles.modalAvatar}
          />
          <Text style={modalStyles.modalStaffName}>
            Dr. C. Mathalai Sundaram
          </Text>
          <Text style={modalStyles.modalStaffEmail}>principal@gmail.com</Text>

          <View style={modalStyles.modalContent}>
            <TextInput
              style={[modalStyles.textInput, modalStyles.multilineInput]}
              placeholder="Reason for appointment"
              multiline
              value={reason}
              onChangeText={setReason}
            />

            <View style={modalStyles.inputRow}>
              <Text style={modalStyles.inputLabel}>Appointment Date:</Text>
              <TouchableOpacity
                style={modalStyles.inputField}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{formatDate(meetingDate)}</Text>
                <Feather name="calendar" size={20} color="#666" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={meetingDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View style={modalStyles.inputRow}>
              <Text style={modalStyles.inputLabel}>Appointment Time:</Text>
              <TouchableOpacity
                style={modalStyles.inputField}
                onPress={() => setShowTimePicker(true)}
              >
                <Text>{formatTime(meetingDate)}</Text>
                <Ionicons name="time-outline" size={20} color="#666" />
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={meetingDate}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onTimeChange}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            style={modalStyles.bookButton}
            onPress={handleRequestAppointment}
          >
            <Text style={modalStyles.bookButtonText}>
              Request Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ScheduleCard = ({
  schedule,
  onPress,
}: {
  schedule: (typeof todaySchedule)[0];
  onPress: (schedule: MeetingDetails) => void;
}) => (
  <TouchableOpacity
    style={principalHome.scheduleCard}
    onPress={() => onPress(schedule)}
  >
    <View style={principalHome.timeContainer}>
      <Text style={principalHome.timeText}>{schedule.time}</Text>
      <Text style={principalHome.endTimeText}>{schedule.endTime}</Text>
    </View>
    <View style={principalHome.divider} />
    <View style={principalHome.detailsContainer}>
      <Text style={principalHome.meetingTitle}>{schedule.type}</Text>
      <Text style={principalHome.meetingSubject}>{schedule.title}</Text>
      <Text style={principalHome.meetingDescription}>
        {schedule.description}
      </Text>
    </View>
  </TouchableOpacity>
);

const StaffHomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState<"home" | "upcoming" | "past">(
    "home"
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDetails | null>(
    null
  );
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);

  const handleCardPress = (meeting: MeetingDetails) => {
    setSelectedMeeting(meeting);
    setModalVisible(true);
  };

  const openRequestModal = () => {
    setIsRequestModalVisible(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalVisible(false);
  };

  const renderHomeContent = () => (
    <>
      <View style={principalHome.welcomeCard}>
        <Text style={principalHome.welcomeTitle}>Welcome Staff !!</Text>
        <Text style={principalHome.welcomeText}>
          Hello Staff! You have meetings lined up for today. Wishing you a
          successful day.
        </Text>
      </View>

      <View style={principalHome.mainImageContainer}>
        <Image
          source={require("../../assets/images/Principal.jpg")}
          style={principalHome.mainImage}
        />
      </View>

      <TouchableOpacity
        style={principalHome.requestButton}
        onPress={openRequestModal}
      >
        <Text style={principalHome.requestButtonText}>Request Appointment</Text>
      </TouchableOpacity>

      <View>
        <Text style={principalHome.sectionTitle}>Today's Schedule</Text>
        {todaySchedule.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onPress={handleCardPress}
          />
        ))}
      </View>
    </>
  );

  const renderUpcomingContent = () => (
    <View>
      <Text style={principalHome.sectionTitle}>Upcoming Meetings</Text>
      <Text style={principalHome.placeholderText}>
        This is where you will list all your upcoming meetings.
      </Text>
    </View>
  );

  const renderPastContent = () => (
    <View>
      <Text style={principalHome.sectionTitle}>Past Meetings</Text>
      <Text style={principalHome.placeholderText}>
        This is where you will list all your past meetings.
      </Text>
    </View>
  );

  return (
    <>
    <view style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
      <View style={principalHome.header}>
        <Image
          source={require("../../assets/images/profile.png")}
          style={principalHome.profileImage}
        />
        <TouchableOpacity onPress={() => router.push("../../(auth-screen)/login_new")}>
          <Ionicons name="log-out-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={principalHome.scrollViewContent}>
        {selectedTab === "home" && renderHomeContent()}
        {selectedTab === "upcoming" && renderUpcomingContent()}
        {selectedTab === "past" && renderPastContent()}
      </ScrollView>

      <View style={principalHome.navBar}>
        <TouchableOpacity
          style={principalHome.navItem}
          onPress={() => setSelectedTab("home")}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={principalHome.navItem}
          onPress={() => setSelectedTab("upcoming")}
        >
          <Ionicons name="time-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={principalHome.navItem}
          onPress={() => setSelectedTab("past")}
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <MeetingModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        meeting={selectedMeeting}
      />

      <RequestAppointmentModal
        isVisible={isRequestModalVisible}
        onClose={closeRequestModal}
      />
      </view>
    </>
  );
};

const principalHome = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#3E5793', // Dark blue background for header to match design
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeCard: {
    backgroundColor: "#3E5793",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  mainImageContainer: {
    alignItems: "center",
    marginTop: -20,
    marginBottom: 10,
  },
  mainImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#fff",
  },
  requestButton: {
    backgroundColor: "#3E5793",
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  requestButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3E5793",
    marginBottom: 20,
  },
  scheduleCard: {
    flexDirection: "row",
    backgroundColor: "#E6E9F0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#A8B3C7",
    alignItems: "center",
  },
  timeContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  endTimeText: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    width: 2,
    height: "100%",
    backgroundColor: "#A8B3C7",
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  meetingSubject: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  meetingDescription: {
    fontSize: 12,
    color: "#555",
  },
  placeholderText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#666",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#3E5793",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
  },
  navItem: {
    padding: 10,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalStaffName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  modalStaffEmail: {
    fontSize: 14,
    color: "#666",
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
  },
  modalTime: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    backgroundColor: "#E6E9F0",
    padding: 15,
    borderRadius: 10,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#F5F8FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A8B3C7",
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#000",
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookButton: {
    backgroundColor: "#95BD79",
    borderRadius: 50,
    paddingVertical: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default StaffHomeScreen;