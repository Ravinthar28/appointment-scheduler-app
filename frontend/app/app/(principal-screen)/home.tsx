import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { principalHome } from "./style";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "@react-navigation/elements";

// interface Meeting {
//   id: number;
//   name: string;
//   date: Date;
//   status: 'pending' | 'confirmed' | 'past';
//   message?: string;
// }

export default function PrincipalHomePage() {
  const [selectedTab, setSelectedTab] = useState<
    "pending" | "confirmed" | "past"
  >("pending");
  // const [meetings, setMeetings] = useState<Meeting[]>([
  //   {
  //     id: 1,
  //     name: 'Dr. Anya Sharma',
  //     date: new Date(new Date().getTime() + 3600000), // 1hr from now
  //     status: 'pending',
  //   },
  //   {
  //     id: 2,
  //     name: 'Mr. Ethan',
  //     date: new Date(new Date().getTime() + 7200000), // 2hr from now
  //     status: 'confirmed',
  //   },
  //   {
  //     id: 3,
  //     name: 'Ms. Olivia Bennett',
  //     date: new Date(new Date().getTime() - 3600000), // 1hr ago
  //     status: 'confirmed',
  //   },
  // ]);

  const [selectedMeeting, setSelectedMeeting] = useState<appointments | null>(
    null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [message, setMessage] = useState("");

  // PARAMETER VALUES
  const userData = useLocalSearchParams();
  
  interface appointments {
    collegeCode:string,
    userName: string;
    userEmail:string
    desc: string;
    dateTime: string;
  }
  // STATES TO STORE THE APPOINTMENTS
  const [pendingAppointments, setPendingAppointments] = useState([
    {
      collegeCode:"",
      userName: "",
      userEmail:"",
      desc: "",
      dateTime: "",
    },
  ]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([
    {
      userName: "",
      userEmail:"",
      desc: "",
      dateTime: "",
    },
  ]);
  const [pastAppointments, setPastAppointments] = useState([
    {
      userName: "",
      userEmail:"",
      desc: "",
      dateTime: "",
    },
  ]);

  // FUNCTION TO FETCH THE REQUESTS DATA FROM THE DB
  const pendingRequest = async () => {
    try {
      const url = "http://localhost:3000/principal/appointments-data";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      setPendingAppointments(result.pendingAppointments);
      setConfirmedAppointments(result.confirmedAppointments);
      setPastAppointments(result.pastAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  // FUNCTION TO GENERATE APPOINTMENTS CARD
  const GenerateAppointmentsCard = ({
    collegeCode,
    userName,
    userEmail,
    desc,
    dateTime,
  }: appointments) => {
    return (
      <TouchableOpacity
        // key={}
        style={principalHome.card}
        onPress={() => {
          setSelectedMeeting({ collegeCode,userName, userEmail, desc, dateTime });
        }}
      >
        <View style={principalHome.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={principalHome.cardName}>Meeting with {userName}</Text>
          <Text style={principalHome.cardTime}>{}</Text>
          {/* {meeting.message && <Text style={principalHome.cardMessage}>{meeting.message}</Text>} */}
        </View>
        <TouchableOpacity>
          <Text style={{ fontSize: 22 }}>{"⏳"}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    pendingRequest();
  }, []);

  const extractDateTime = (dateTime : string) => {
    const dateObject = new Date(dateTime);
    const date = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = `${(dateObject.getHours() > 12)? dateObject.getHours()-12: dateObject.getHours()}:${dateObject.getMinutes()} ${(dateObject.getHours() > 12) ? 'PM' : 'AM'}`;
    return `${date}, ${time}`;
  };
  // ------- WORKING --------
  console.log(selectedMeeting);
  const acceptAppointment = async ()=> {
    try{
      const url = "http://localhost:3000/principal/accept-appointment"
      const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(selectedMeeting)
      });
      if(! response) throw new Error ("Failed to accept the appiontment by the principal");
      alert(`Appointment with ${selectedMeeting?.userName} is scheduled on ${extractDateTime(selectedMeeting?.dateTime || String(tempDate))}`);
      router.push({
        pathname:'/(principal-screen)/home',
        params:userData
      })
      setSelectedMeeting(null);
    }
    catch(error){
      alert(error);
    }
  }
  // // Automatically move confirmed to past
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     setMeetings((prev) =>
  //       prev.map((meeting) =>
  //         meeting.status === 'confirmed' && meeting.date < now
  //           ? { ...meeting, status: 'past' }
  //           : meeting
  //       )
  //     );
  //   }, 60000); // every minute

  //   return () => clearInterval(interval);
  // }, []);

  // const handleConfirm = () => {
  //   if (!selectedMeeting) return;
  //   const updated = meetings.map((m) =>
  //     m.id === selectedMeeting.id
  //       ? {
  //           ...m,
  //           date: tempDate,
  //           status: 'confirmed',
  //           message,
  //         }
  //       : m
  //   );
  //   Alert.alert('Appointment Allocated', 'The appointment has been confirmed.');
  //   setSelectedMeeting(null);
  //   setMessage('');
  // };

  // const toggleStatusWithEmoji = (id: number) => {
  //   setMeetings((prev) =>
  //     prev.map((m) =>
  //       m.id === id && m.status !== 'past'
  //         ? {
  //             ...m,
  //             status: m.status === 'pending' ? 'confirmed' : 'pending',
  //           }
  //         : m
  //     )
  //   );
  // };

  return (
    <ScrollView contentContainerStyle={principalHome.container}>
      {/* Header */}
      {/* <View style={principalHome.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={principalHome.title}>Appointments</Text>
      </View> */}

      {/* Tabs */}
      <View style={principalHome.tabs}>
        {["pending", "confirmed", "past"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              principalHome.tabButton,
              selectedTab === tab && principalHome.tabSelected,
            ]}
            onPress={() => setSelectedTab(tab as typeof selectedTab)}
          >
            <Text
              style={[
                principalHome.tabText,
                selectedTab === tab && principalHome.tabTextSelected,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Meeting Cards */}
      {selectedTab === "pending" &&
        pendingAppointments.map((appointments) => (
          <GenerateAppointmentsCard
            collegeCode={String(userData.collegeCode)}
            // id={appointments.id}
            userName={appointments.userName}
            userEmail = {appointments.userEmail}
            desc={appointments.desc}
            dateTime={appointments.dateTime}
          />
        ))}
      {/* {meetings
        .filter((m) => m.status === selectedTab)
        .map((meeting) => (
          <TouchableOpacity
            key={meeting.id}
            style={principalHome.card}
            onPress={() => {
              if (meeting.status !== 'past') {
                setSelectedMeeting(meeting);
                setTempDate(meeting.date);
              }
            }}
          >
            <View style={principalHome.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={principalHome.cardName}>Meeting with {meeting.name}</Text>
              <Text style={principalHome.cardTime}>
                {meeting.date.toLocaleDateString()} –{' '}
                {meeting.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              {meeting.message && <Text style={principalHome.cardMessage}>{meeting.message}</Text>}
            </View>
            {meeting.status !== 'past' && (
              <TouchableOpacity onPress={() => toggleStatusWithEmoji(meeting.id)}>
                <Text style={{ fontSize: 22 }}>
                  {meeting.status === 'pending' ? '⏳' : '✅'}
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))} */}

      {/* Modal */}
      <Modal visible={!!selectedMeeting} animationType="slide" transparent>
        <View style={principalHome.modalBackground}>
          <View style={principalHome.modalContainer}>
            <View style={principalHome.modelMsgBox}>
              <View style={principalHome.modelMsg}>
                <Text style={principalHome.modelUserName}>
                  {selectedMeeting?.userName}
                </Text>
                <Text style={principalHome.modelDesc}>
                  {selectedMeeting?.desc}
                </Text>
                <Text style={principalHome.modelDateTime}>
                  {extractDateTime(
                    selectedMeeting?.dateTime || String(tempDate)
                  )}
                </Text>
              </View>
              <View style= {principalHome.modelAcceptBtnContainer}>
                <TouchableOpacity style = {principalHome.modelMsgAcceptBtn} onPress={()=>acceptAppointment()}>
                  <Text style = {{color:"#fff"}}>
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={principalHome.formHeading}>Select Available Time</Text>

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={principalHome.input}
            >
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

            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={principalHome.input}
            >
              <Text>
                {tempDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
                      new Date(
                        tempDate.setHours(time.getHours(), time.getMinutes())
                      )
                    );
                }}
              />
            )}

            <TextInput
              placeholder="Optional Message"
              value={message}
              onChangeText={setMessage}
              style={[principalHome.input, { height: 80 }]}
              multiline
            />

            <TouchableOpacity style={principalHome.confirmButton}>
              <Text style={principalHome.confirmText}>Reschedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedMeeting(null)}
              style={principalHome.cancelButton}
            >
              <Text style={principalHome.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
