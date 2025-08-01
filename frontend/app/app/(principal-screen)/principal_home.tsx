
import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';


import { new_principal_styles } from './style';
export default function PrincipalHome(){

    const scheduleItems = [
    {
      timeStart: '11:30',
      timeEnd: '13:00',
      type: 'Meeting',
      title: 'Discussion with Placement Cell',
      details: 'Discussion about upcoming company recruitment',
    },
    {
      timeStart: '14:00',
      timeEnd: '15:00',
      type: 'Meeting',
      title: 'Discussion with CS HOD',
      details: 'Discussion about ongoing app project',
    },
    {
      timeStart: '17:00',
      timeEnd: '17:30',
      type: 'Meeting',
      title: 'Discussion with Civil HOD',
      details: 'Discussion about ongoing app project',
    },
    {
      timeStart: '17:30',
      timeEnd: '18:00',
      type: 'Meeting',
      title: 'Discussion with CS HOD',
      details: 'Discussion about ongoing app project',
    },
    // You can add more schedule items here
  ];

    return(
        <>
        <View style={new_principal_styles.welcomeCard}>
        <Text style={new_principal_styles.welcomeTitle}>Welcome Principal !!</Text>
        <Text style={new_principal_styles.welcomeDescription}>
          Lorem ipsum dolor sit amet consectetur. Sit adipiscing gravida in faucibus.
        </Text>
      </View>

      <Text style={new_principal_styles.todayScheduleText}>Today's Schedule</Text>

      <ScrollView contentContainerStyle={new_principal_styles.scheduleList}>
        {scheduleItems.map((item, index) => (
          <View key={index} style={new_principal_styles.scheduleItemCard}>
            <View style={new_principal_styles.timeContainer}>
              <Text style={new_principal_styles.timeStart}>{item.timeStart}</Text>
              <Text style={new_principal_styles.timeEnd}>{item.timeEnd}</Text>
            </View>
            <View style={new_principal_styles.verticalLine}></View>
            <View style={new_principal_styles.detailsContainer}>
              <Text style={new_principal_styles.meetingType}>{item.type}</Text>
              <Text style={new_principal_styles.meetingTitle}>{item.title}</Text>
              <Text style={new_principal_styles.meetingDetails}>{item.details}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
        </>
    )
}