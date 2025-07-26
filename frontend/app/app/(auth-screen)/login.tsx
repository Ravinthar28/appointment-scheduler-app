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
import { loginStyles } from './style';

// BASE URL
import { baseUrl } from "../apiUrl";

export default function LoginForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'staff' | 'principal'>('staff');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeCode, setCollegeCode] = useState('');

  console.log(baseUrl);

  const handleLogin = async () => {

    try{
      const userData = {
        email,
        password,
        collegeCode,
        selectedRole
      };
      const url = `${baseUrl}/auth/login`
      const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({userData})
      });
      if(! response.ok){
        throw new Error ("Faild to load");
      }
      if(selectedRole == 'principal') router.push({
            pathname:'/(principal-screen)/home',
            params: {
              email,
              collegeCode
            }
          })
      if(selectedRole == 'staff') router.push({
        pathname:'/(staff-screen)/home',
        params:{
          email,
          collegeCode
        }
      });
    }
    catch(error){
      console.log(error);
      alert("Check the email and password");
    }

     /*if (selectedRole === 'staff') {
       router.push('/(staff-screen)/home');
     } else if (selectedRole === 'principal') {
       router.push('/(principal-screen)/home');
     } else {
       Alert.alert('Select Role', 'Please select a role to proceed.');
    }*/
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

      {/* College Code Input */}
<View style={loginStyles.inputBox}>
  <Text style={loginStyles.label}>College Code</Text>
  <TextInput
    placeholder="Enter College Code"
    placeholderTextColor="#ccc"
    style={loginStyles.input}
    keyboardType="default"
    autoCapitalize="none"
    value={collegeCode}
    onChangeText={setCollegeCode}
  />
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
          <Text style={loginStyles.signInText}>Sign In</Text>
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

