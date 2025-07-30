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

export default function Register(){
    return(
        <LinearGradient
              colors={['#2D3F75', '#3A508C', '#5C7FB7', '#7D9DCF']} // 
              style={register_styles.container}
              start={{ x: 0.5, y: 0 }} // Starts from the top-center
              end={{ x: 0.5, y: 1 }}   // Ends at the bottom-center
            >
                
            </LinearGradient>
    )
}