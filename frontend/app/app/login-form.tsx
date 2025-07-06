import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LoginForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'staff' | 'principal'>('staff');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    // You can also validate email format or password strength here

    router.push('/home');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Image */}
        <Image
          source={require('../assets/images/university.jpeg')}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Heading */}
        <Text style={styles.heading}>Welcome Back</Text>

        {/* Email Input */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#ccc"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#ccc"
              secureTextEntry={!showPassword}
              style={[styles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <Text style={styles.forgotText}>Forgot Password?</Text>

        {/* Role Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedRole === 'staff' && styles.toggleSelected]}
            onPress={() => setSelectedRole('staff')}
          >
            <Text style={selectedRole === 'staff' ? styles.toggleTextSelected : styles.toggleText}>Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedRole === 'principal' && styles.toggleSelected]}
            onPress={() => setSelectedRole('principal')}
          >
            <Text style={selectedRole === 'principal' ? styles.toggleTextSelected : styles.toggleText}>Principal</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleLogin}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don’t have an account? <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0c10',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  image: {
    width: width,
    height: 220,
    borderRadius: 30,
    marginBottom: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputBox: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    width: '100%',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    paddingHorizontal: 12,
    width: '100%',
  },
  forgotText: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 20,
    alignSelf: 'flex-start',
    maxWidth: 350,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1c1c1e',
    borderRadius: 25,
    marginBottom: 20,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 350,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  toggleSelected: {
    backgroundColor: '#000',
  },
  toggleText: {
    color: '#ccc',
    fontWeight: '600',
  },
  toggleTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  signInButton: {
    backgroundColor: '#2979ff',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    maxWidth: 350,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 350,
  },
});
