import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { register_styles } from "./new_style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// BASE URL
import { baseUrl } from "../apiUrl";

// LOCAL STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"staff" | "principal">(
    "staff"
  );

  interface data {
    isLogin: string;
    email: string;
    collegeCode: string;
    selectedRole: string;
  }
  const storeData = async (data: data) => {
    try {
      await AsyncStorage.setItem("isLogin", data.isLogin);
      await AsyncStorage.setItem("email", data.email);
      await AsyncStorage.setItem("collegeCode", data.collegeCode);
      await AsyncStorage.setItem("selectedRole", data.selectedRole);

      console.log("data stroed");
    } catch (error) {
      console.log("Error in storing the data in local storage");
    }
  };

  const handleLogin = async () => {
    try {
      const userData = {
        email,
        password,
        collegeCode,
        selectedRole,
      };
      const url = `${baseUrl}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData }),
      });
      if (!response.ok) {
        throw new Error("Faild to load");
      }
      storeData({
        isLogin: "true",
        email: email,
        collegeCode: collegeCode,
        selectedRole: selectedRole,
      });
      if (selectedRole == "principal")
        router.push({
          pathname: "/(principal-screen)",
          params: {
            email,
            collegeCode,
          },
        });
      if (selectedRole == "staff")
        router.push({
          pathname: "/(staff-screen)/home",
          params: {
            email,
            collegeCode,
          },
        });
    } catch (error) {
      console.log(error);
      alert("Check the email and password");
    }

    // if (selectedRole === 'staff') {
    //    router.push('/(staff-screen)/home');
    //  } else if (selectedRole === 'principal') {
    //    router.push('/(principal-screen)');
    //  }
  };

  const isFormValid = email && collegeCode && password && selectedRole;

  return (
    <LinearGradient
      colors={["#2D3F75", "#3A508C", "#5C7FB7", "#7D9DCF"]} //
      style={register_styles.container}
      start={{ x: 0.5, y: 0 }} // Starts from the top-center
      end={{ x: 0.5, y: 1 }} // Ends at the bottom-center
    >
      <View style={register_styles.innerContainer}>
        <View style={register_styles.pageTitle}>
          <TouchableOpacity
            style={register_styles.pageTitleIcon}
            onPress={() => router.back()}
          >
            <Ionicons name={"arrow-back"} size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={register_styles.pageTitleContent}>Login</View>
        </View>
        <View style={register_styles.outerContainer}>
          <View style={register_styles.inputFormContainer}>
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
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#000000"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Role Toggle */}
            <Text style={[register_styles.label, { fontSize: 25 }]}>
              Select Role
            </Text>
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
                  selectedRole === "principal" &&
                    register_styles.toggleSelected,
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
                onPress={handleLogin }
                // disabled={!isFormValid}
              >
                <Text style={register_styles.nextButtonText}>Login</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
