import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const PastMeetingsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Past Meetings:</Text>
      {/* Your logic for past meetings will go here */}
      <Text style={styles.placeholderText}>
        This is where you will list all your past meetings.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80, // Add padding at the bottom for the nav bar
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E5793',
    marginBottom: 20,
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
});

export default PastMeetingsScreen;