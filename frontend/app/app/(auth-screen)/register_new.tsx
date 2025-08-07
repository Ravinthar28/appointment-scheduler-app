import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import { register_styles } from "./new_style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// BASE URL
import { baseUrl } from "../apiUrl";

// NOTIFICATIONS
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"staff" | "principal">(
    "staff"
  );

    // NOTIFICATION
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
      undefined
    );
  
    useEffect(() => {
      registerForPushNotificationsAsync()
        .then(token => setExpoPushToken(token ?? ''))
        .catch((error: any) => setExpoPushToken(`${error}`));
  
      const notificationListener = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        notificationListener.remove();
        responseListener.remove();
      };
    }, []);

  const handleNext = async () => {
      if (!fullName || !email || !phone || !collegeCode || !password || !selectedRole) {
        alert('Validation Error, Please fill in all the fields.');
        return;
      }
  
      try {
        setIsLoading(true);
        console.log(isLoading);
        const userData = {
          fullName,
          email,
          phone,
          collegeCode,
          password,
          role: selectedRole,
          expoPushToken
        };
        const url = `${baseUrl}/auth/register`;
        const response = await fetch(url,{
          method: "POST",
          headers: { "Content-Type":"application/json"},
          body: JSON.stringify({userData})
        })
        if(! response.ok){
          throw new Error("Failed to fetch teh data");
        }
        alert("Registerd Successfully");
        router.push('/(auth-screen)/login_new')
      }
      catch (error){
        alert('Make sure the college code you provided is correct')
        console.log(error);
      }
      setIsLoading(false);
    };

  const isFormValid =
    fullName && email && phone && collegeCode && password && selectedRole;

  return (
    <SafeAreaView style={{flex:1}}>
      {
        isLoading && <ActivityIndicator size={'large'} style={{flex:1}} />
      }
      <LinearGradient
      colors={["#2D3F75", "#3A508C", "#5C7FB7", "#7D9DCF"]} //
      style={register_styles.container}
      start={{ x: 0.5, y: 0 }} // Starts from the top-center
      end={{ x: 0.5, y: 1 }} // Ends at the bottom-center
    >
      <ScrollView style={register_styles.innerContainer}>
        <View style={register_styles.pageTitle}>
          <TouchableOpacity
            style={register_styles.pageTitleIcon}
            onPress={() => router.back()}
          >
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
            <Text style={register_styles.label}>
              Email
              <Text style={register_styles.requiredAsteriskRed}> *</Text>
              </Text>
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
              onPress={handleNext}
              disabled={!isFormValid}
            >
              <Text style={register_styles.nextButtonText}>Register</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
    </SafeAreaView>
    
  );
}
