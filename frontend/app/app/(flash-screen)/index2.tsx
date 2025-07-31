import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, } from "react-native";
import LinearGradient from 'react-native-linear-gradient'; // Install LinearGradient: https://github.com/react-native-linear-gradient/react-native-linear-gradient
export default function FlashScreen() {
    return (
        <SafeAreaView 
            style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
            }}>
            <ScrollView  
                style={{
                    flex: 1,
                }}>
                <View 
                    style={{
                        marginVertical: 54,
                        marginHorizontal: 17,
                    }}>
                    <View 
                        style={{
                            flexDirection: "row",
                            marginBottom: 10,
                            marginLeft: 2,
                        }}>
                        <Image
                            source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ObgM7M3Mf6/rxunnnct_expires_30_days.png"}} 
                            resizeMode = {"stretch"}
                            style={{
                                width: 63,
                                height: 63,
                                marginRight: 33,
                            }}
                        />
                        <Text 
                            style={{
                                color: "#FFFFFF",
                                fontSize: 24,
                                fontWeight: "bold",
                                marginTop: 13,
                            }}>
                            {"Create Account "}
                        </Text>
                    </View>
                    <Text 
                        style={{
                            color: "#FFFFFF",
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 22,
                            width: 205,
                        }}>
                        {"Personal Information\n"}
                    </Text>
                    <View 
                        style={{
                            marginBottom: 18,
                        }}>
                        <Text 
                            style={{
                                color: "#FFFFFF",
                                fontSize: 18,
                                fontWeight: "bold",
                                marginBottom: 15,
                            }}>
                            {"Full Name"}
                        </Text>
                        <TouchableOpacity 
                            style={{
                                alignItems: "center",
                                backgroundColor: "#D9D9D9AD",
                                borderRadius: 14,
                                paddingVertical: 10,
                            }} onPress={()=>alert('Pressed!')}>
                            <Text 
                                style={{
                                    color: "#000000",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {"Enter your full name"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View 
                        style={{
                            marginBottom: 18,
                        }}>
                        <Text 
                            style={{
                                color: "#FFFFFF",
                                fontSize: 18,
                                fontWeight: "bold",
                                marginBottom: 15,
                            }}>
                            {"Email"}
                        </Text>
                        <TouchableOpacity 
                            style={{
                                alignItems: "center",
                                backgroundColor: "#D9D9D9AD",
                                borderRadius: 14,
                                paddingVertical: 10,
                            }} onPress={()=>alert('Pressed!')}>
                            <Text 
                                style={{
                                    color: "#000000",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {"Enter your email"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View 
                        style={{
                            marginBottom: 61,
                        }}>
                        <Text 
                            style={{
                                color: "#FFFFFF",
                                fontSize: 18,
                                fontWeight: "bold",
                                marginBottom: 15,
                            }}>
                            {"Phone Number"}
                        </Text>
                        <TouchableOpacity 
                            style={{
                                alignItems: "center",
                                backgroundColor: "#D9D9D9AD",
                                borderRadius: 14,
                                paddingVertical: 10,
                            }} onPress={()=>alert('Pressed!')}>
                            <Text 
                                style={{
                                    color: "#000000",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {"Enter your phone number"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text 
                        style={{
                            color: "#FFFFFF",
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 190,
                            width: 108,
                        }}>
                        {"Select Role"}
                    </Text>
                    <View 
                        style={{
                            alignItems: "center",
                        }}>
                        <TouchableOpacity onPress={()=>alert('Pressed!')}>
                            <LinearGradient 
                                start={{x:0, y:0}}
                                end={{x:0, y:1}}
                                colors={["#1F3988CC", "#070E22CC"]}
                                style={{
                                    borderRadius: 25,
                                    paddingVertical: 12,
                                    paddingHorizontal: 51,
                                }}>
                                <Text 
                                    style={{
                                        color: "#FFFFFF",
                                        fontSize: 20,
                                        fontWeight: "bold",
                                    }}>
                                    {"Next"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}