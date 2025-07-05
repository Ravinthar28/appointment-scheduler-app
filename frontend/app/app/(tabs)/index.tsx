import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

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
          onPress={() => router.push('/login-form')}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0b0c10',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.08,
    paddingHorizontal: width * 0.06,
  },
  image: {
    width: width * 0.85,
    height: height * 0.3,
    marginBottom: height * 0.05,
    borderRadius: 20,
  },
  heading: {
    color: '#ffffff',
    fontSize:
      width < 360 ? 17 : width < 480 ? 19 : width < 768 ? 22 : 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: height * 0.05,
  },
  loginButton: {
    backgroundColor: '#2979ff',
    paddingVertical: height * 0.018,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  registerButton: {
    backgroundColor: '#1f1f1f',
    paddingVertical: height * 0.018,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width < 360 ? 14 : 16,
  },
  buttonTextAlt: {
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: width < 360 ? 14 : 16,
  },
  footer: {
    color: '#999',
    fontSize: width < 360 ? 11 : 13,
    textAlign: 'center',
    marginBottom: 30,
  },
});
