import { LinearGradient } from "expo-linear-gradient";
import React from "react";

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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function Register() {
  return (
    <LinearGradient
      colors={["#2D3F75", "#3A508C", "#5C7FB7", "#7D9DCF"]} //
      style={register_styles.container}
      start={{ x: 0.5, y: 0 }} // Starts from the top-center
      end={{ x: 0.5, y: 1 }} // Ends at the bottom-center
    >
        <View style={register_styles.innerContainer}>
            <View style={register_styles.pageTitle}>
                <View style={register_styles.pageTitleIcon}>
                  <FontAwesomeIcon icon={faArrowLeft} size={30} color="white" />
                </View>
                <View style={register_styles.pageTitleContent}>
                    Create Account
                </View>
            </View>
            <View>
              <Text style={register_styles.personalInfoTitle}>
                Personal Information
              </Text>
            </View>
        </View>
    </LinearGradient>
  );
}
