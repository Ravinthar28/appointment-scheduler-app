import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginStyles } from './style';

export default function LoginForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'staff' | 'principal'>('staff');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem('registeredUsers');
      const users = usersData ? JSON.parse(usersData) : [];

      const matchedUser = users.find(
        (user: any) =>
          user.email === email &&
          user.password === password &&
          user.role === selectedRole
      );

      if (matchedUser) {
        Alert.alert('Login Success', 'Welcome!', [
          {
            text: 'OK',
            onPress: () => {
              if (selectedRole === 'staff') {
                router.push('/staff-home');
              } else {
                router.push('/principal-home');
              }
            },
          },
        ]);
      } else {
        Alert.alert('Login Failed', 'Invalid email, password, or role.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', 'Something went wrong during login.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={loginStyles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Image */}
        <Image
          source={require('../../assets/images/university.jpeg')}
          style={loginStyles.image}
          resizeMode="cover"
        />

        {/* Heading */}
        <Text style={loginStyles.heading}>Welcome Back</Text>

        {/* Email Input */}
        <View style={loginStyles.inputBox}>
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#ccc"
            style={loginStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={loginStyles.inputBox}>
          <Text style={loginStyles.label}>Password</Text>
          <View style={loginStyles.passwordWrapper}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#ccc"
              secureTextEntry={!showPassword}
              style={[loginStyles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <Text style={loginStyles.forgotText}>Forgot Password?</Text>

        {/* Role Toggle */}
        <View style={loginStyles.toggleContainer}>
          <TouchableOpacity
            style={[
              loginStyles.toggleButton,
              selectedRole === 'staff' && loginStyles.toggleSelected,
            ]}
            onPress={() => setSelectedRole('staff')}
          >
            <Text
              style={
                selectedRole === 'staff'
                  ? loginStyles.toggleTextSelected
                  : loginStyles.toggleText
              }
            >
              Staff
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              loginStyles.toggleButton,
              selectedRole === 'principal' && loginStyles.toggleSelected,
            ]}
            onPress={() => setSelectedRole('principal')}
          >
            <Text
              style={
                selectedRole === 'principal'
                  ? loginStyles.toggleTextSelected
                  : loginStyles.toggleText
              }
            >
              Principal
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={loginStyles.signInButton} onPress={handleLogin}>
          <Text style={loginStyles.signInText}
          onPress={() => router.push('/staff-home')}>Sign In</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={loginStyles.footerText}>
          Don’t have an account?{' '}
          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={() => router.push('/register')}
          >
            Sign up
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
