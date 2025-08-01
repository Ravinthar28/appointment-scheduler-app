import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { new_principal_styles } from "./style";
import { baseUrl } from "../apiUrl";

interface principalHomeProps{
  email?:string | string[],
  collegeCode?:string | string[]
}
export default function PrincipalHome({email,collegeCode}:principalHomeProps) {
  
  const scheduleItems = [
    {
      timeStart: "11:30",
      timeEnd: "13:00",
      type: "Meeting",
      title: "Discussion with Placement Cell",
      details: "Discussion about upcoming company recruitment",
    },
    {
      timeStart: "14:00",
      timeEnd: "15:00",
      type: "Meeting",
      title: "Discussion with CS HOD",
      details: "Discussion about ongoing app project",
    },
    {
      timeStart: "17:00",
      timeEnd: "17:30",
      type: "Meeting",
      title: "Discussion with Civil HOD",
      details: "Discussion about ongoing app project",
    },
    {
      timeStart: "17:30",
      timeEnd: "18:00",
      type: "Meeting",
      title: "Discussion with CS HOD",
      details: "Discussion about ongoing app project",
    },
    // You can add more schedule items here
  ];

  const [selectedMeeting, setSelectedMeeting] = useState<appointments | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  interface appointments {
    collegeCode: string;
    id: string;
    userName: string;
    userEmail: string;
    desc: string;
    dateTime: Date;
  }

  const [confirmedAppointments, setConfirmedAppointments] = useState<
    appointments[]
  >([]);

  // FUNCTION TO FETCH THE REQUESTS DATA FROM THE DB
  const fetchRequest = async () => {
    try {
      const url = `${baseUrl}/principal/appointments-data`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email,collegeCode}),
      });
      const result = await response.json();
      setConfirmedAppointments(result.confirmedAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  // refresh control function
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequest();
    setRefreshing(false);
  };

  // FUNCTION TO GENERATE APPOINTMENTS CARD
  const GenerateAppointmentsCard = ({
    collegeCode,
    id,
    userName,
    userEmail,
    desc,
    dateTime,
  }: appointments) => {
    return (
      <View key={id} style={new_principal_styles.scheduleItemCard}>
            <View style={new_principal_styles.timeContainer}>
              <Text style={new_principal_styles.timeStart}>
                {extractDateTime(dateTime)}
              </Text>
            </View>
            <View style={new_principal_styles.verticalLine}></View>
            <View style={new_principal_styles.detailsContainer}>
              <Text style={new_principal_styles.meetingType}>Meeting</Text>
              <Text style={new_principal_styles.meetingTitle}>
                {`Appointment from ${userName}`}
              </Text>
              <Text style={new_principal_styles.meetingDetails}>
                {desc}
              </Text>
            </View>
          </View>
    );
  };

  useEffect(() => {
    fetchRequest();
    console.log(confirmedAppointments);
  }, []);

  // FUNCTION TO EXTRACT THE DATE AND TIME FORMAT
  const extractDateTime = (dateTime: Date) => {
    const dateObject = new Date(dateTime);
    const date = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = `${
      dateObject.getHours() > 12
        ? dateObject.getHours() - 12
        : dateObject.getHours()
    }:${dateObject.getMinutes()} ${dateObject.getHours() > 12 ? "PM" : "AM"}`;

    return `${date}, ${time}`;
  };

  return (
    <>
      <View style={new_principal_styles.welcomeCard}>
        <Text style={new_principal_styles.welcomeTitle}>
          Welcome Principal !!
        </Text>
        <Text style={new_principal_styles.welcomeDescription}>
          Lorem ipsum dolor sit amet consectetur. Sit adipiscing gravida in
          faucibus.
        </Text>
      </View>

      <Text style={new_principal_styles.todayScheduleText}>
        Today's Schedule
      </Text>

      <ScrollView
        contentContainerStyle={new_principal_styles.scheduleList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >

        {
          confirmedAppointments.map((appointment) => (
            <GenerateAppointmentsCard collegeCode={appointment.collegeCode} id={appointment.id} userEmail={appointment.userEmail} userName={appointment.userName} desc={appointment.desc} dateTime={appointment.dateTime} />
          ))
        }
        {/* {scheduleItems.map((item, index) => (
          <View key={index} style={new_principal_styles.scheduleItemCard}>
            <View style={new_principal_styles.timeContainer}>
              <Text style={new_principal_styles.timeStart}>
                {item.timeStart}
              </Text>
              <Text style={new_principal_styles.timeEnd}>{item.timeEnd}</Text>
            </View>
            <View style={new_principal_styles.verticalLine}></View>
            <View style={new_principal_styles.detailsContainer}>
              <Text style={new_principal_styles.meetingType}>{item.type}</Text>
              <Text style={new_principal_styles.meetingTitle}>
                {item.title}
              </Text>
              <Text style={new_principal_styles.meetingDetails}>
                {item.details}
              </Text>
            </View>
          </View>
        ))} */}
      </ScrollView>
    </>
  );
}
