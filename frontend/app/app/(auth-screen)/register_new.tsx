import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { register_styles } from "./new_style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Register() {

  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"staff" | "principal">(
    "staff"
  );

  const isFormValid =
    fullName && email && phone && collegeCode && password && selectedRole;

  return (
    <LinearGradient
      colors={["#2D3F75", "#3A508C", "#5C7FB7", "#7D9DCF"]} //
      style={register_styles.container}
      start={{ x: 0.5, y: 0 }} // Starts from the top-center
      end={{ x: 0.5, y: 1 }} // Ends at the bottom-center
    >
      <View style={register_styles.innerContainer}>
        <View style={register_styles.pageTitle}>
          <TouchableOpacity style={register_styles.pageTitleIcon} onPress={()=>router.back()}>
            <Ionicons name={"arrow-back"} size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={register_styles.pageTitleContent}>Create Account</View>
        </View>
        <View>
          <Text style={register_styles.personalInfoTitle}>
            Personal Information
          </Text>
        </View>
        <View style={register_styles.inputFormContainer}>
          {/* Full Name */}
          <View style={register_styles.inputBox}>
            <Text style={register_styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter your fullname"
              placeholderTextColor="#000000"
              style={register_styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email */}
          <View style={register_styles.inputBox}>
            <Text style={register_styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#000000"
              keyboardType="email-address"
              autoCapitalize="none"
              style={register_styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Phone */}
          <View style={register_styles.inputBox}>
            <Text style={register_styles.label}>Phone Number</Text>
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor="#000000"
              keyboardType="phone-pad"
              style={register_styles.input}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* College Code */}
          <View style={register_styles.inputBox}>
            <Text style={register_styles.label}>College Code</Text>
            <TextInput
              placeholder="Enter college code"
              placeholderTextColor="#000000"
              style={register_styles.input}
              value={collegeCode}
              onChangeText={setCollegeCode}
            />
          </View>

          {/* Password */}
          <View style={register_styles.inputBox}>
            <Text style={register_styles.label}>Password</Text>
            <View style={register_styles.passwordWrapper}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#000000"
                secureTextEntry={!showPassword}
                style={[register_styles.input, { flex: 1 }]}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Role Toggle */}
          <Text style={[register_styles.label,{fontSize:25}]}>Select Role</Text>
          <LinearGradient
            colors={["#1F3988", "#080E22"]}
            style={register_styles.toggleContainer}
          >
            <TouchableOpacity
              style={[
                register_styles.toggleButton,
                selectedRole === "staff" && register_styles.toggleSelected,
              ]}
              onPress={() => setSelectedRole("staff")}
            >
              <Text
                style={
                  selectedRole === "staff"
                    ? register_styles.toggleTextSelected
                    : register_styles.toggleText
                }
              >
                Staff
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                register_styles.toggleButton,
                selectedRole === "principal" && register_styles.toggleSelected,
              ]}
              onPress={() => setSelectedRole("principal")}
            >
              <Text
                style={
                  selectedRole === "principal"
                    ? register_styles.toggleTextSelected
                    : register_styles.toggleText
                }
              >
                Principal
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Next Button */}
          
          <LinearGradient
            colors={["#1F3988", "#080E22"]}
            style={[
              register_styles.nextButton,
              !isFormValid && { backgroundColor: "#555" },
            ]}
          >
            <TouchableOpacity
              onPress={() => router.push('/(auth-screen)/login')}
              // disabled={!isFormValid}
            >
              <Text style={register_styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
}
