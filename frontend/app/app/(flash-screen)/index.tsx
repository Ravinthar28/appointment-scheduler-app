import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

// STYLES
import { styles } from './style';


export default function HomeScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Large Centered Image */}
        <Image
          source={require('../../assets/images/appointment login.jpeg')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Heading Text */}
        <Text style={styles.heading}>
          Connect With Your Principal{'\n'}Schedule Meetings. No Waiting.
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.buttonTextAlt}>Register</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>Don’t have a college code? Learn more</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


