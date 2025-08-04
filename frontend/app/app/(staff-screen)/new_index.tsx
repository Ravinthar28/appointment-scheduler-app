import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type TabType = "home" | "upcoming" | "past";

// Header Component
export const Header = () => {
  return (
    <View style={headerStyles.header}>
      <Image
        source={require("../../assets/images/profile.png")}
        style={headerStyles.profileImage}
      />
      <TouchableOpacity onPress={() => router.push("../../(auth-screen)/login_new")}>
        <Ionicons name="log-out-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// NavBar Component
export const NavBar = ({ selectedTab, setSelectedTab }: { selectedTab: TabType, setSelectedTab: (tab: TabType) => void }) => {
  return (
    <View style={navBarStyles.navBar}>
      <TouchableOpacity
        style={navBarStyles.navItem}
        onPress={() => setSelectedTab("home")}
      >
        <Ionicons name="home-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={navBarStyles.navItem}
        onPress={() => setSelectedTab("upcoming")}
      >
        <Ionicons name="time-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={navBarStyles.navItem}
        onPress={() => setSelectedTab("past")}
      >
        <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#3E5793',
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

const navBarStyles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#3E5793",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
  },
  navItem: {
    padding: 10,
  },
});