import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Or 'react-native-linear-gradient' for bare RN

import {styles} from "./new_style";

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={['#2D3F75', '#3A508C', '#5C7FB7', '#7D9DCF']} // 
      style={styles.container}
      start={{ x: 0.5, y: 0 }} // Starts from the top-center
      end={{ x: 0.5, y: 1 }}   // Ends at the bottom-center
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back Sign In{"\n"}or Register</Text>
        <Text style={styles.subtitle}>Connect With Your Principal Schedule{"\n"}Meeting.No Waiting.</Text>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'flex-end', // Aligns content to the bottom
//     alignItems: 'center',
//     paddingBottom: 50, // Adjust as needed to move content up from the bottom
//     width: '100%',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#ccc', // A slightly lighter color for subtitle
//     textAlign: 'center',
//     marginBottom: 40,
//     lineHeight: 24,
//   },
//   loginButton: {
//     backgroundColor: '#4A6296', // A darker blue similar to the image
//     paddingVertical: 15,
//     paddingHorizontal: 80,
//     borderRadius: 30,
//     marginBottom: 15,
//     width: '80%', // Adjust width as needed
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
//   registerButton: {
//     backgroundColor: '#4A6296', // Same color as login button
//     paddingVertical: 15,
//     paddingHorizontal: 80,
//     borderRadius: 30,
//     width: '80%', // Adjust width as needed
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });