import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";

import { baseUrl } from "../apiUrl";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

interface confirmedAppointmentScreenProps {
  email: string;
  collegeCode: string;
}

interface appointments {
  collegeCode: string;
  id: string;
  userName: string;
  userEmail: string;
  desc: string;
  dateTime: Date;
}

export default function ConfirmedAppointmentScreen({
  email,
  collegeCode,
}: confirmedAppointmentScreenProps) {
  const [confirmedAppointments, setConfirmedAppointments] = useState<
    appointments[]
  >([]);

  const [newDate,setNewDate] = useState(new Date());

  // FUNCTION TO FETCH THE REQUESTS DATA FROM THE DB
  const fetchRequest = async () => {
    try {
      const url = `${baseUrl}/principal/appointments-data`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, collegeCode }),
      });
      const result = await response.json();

      setConfirmedAppointments(result.confirmedAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const dummyData = [
    {
      id: "jfoweijfoiewj",
      userName: "Staff 1",
      userEmail: "staff1@gmail.com",
      desc: "fjiaewf ioewjf kajweiofj awejfio jewf joiwe fj",
      dateTime: newDate,
    },
    {
      id: "jfoweijfoiewj",
      userName: "Staff 2",
      userEmail: "staff2@gmail.com",
      desc: "fjiaewf ioewjf kajweiofj awejfio jewf joiwe fj",
      dateTime: newDate,
    },
  ];
  function AppointmentCards() {
    return (
      <ScrollView style={{height:"100%"}}>
        {dummyData.map((data) => (
          <>
            <TouchableOpacity style={styles.appointmentCardOuterContainer}>
              <View style={styles.appointmentCard}>
                <View style={styles.cardProfileContainer}>
                  <Image
                    source={require("../../assets/images/profile.png")}
                    style={styles.cardProfilePic}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardUserName}>{data.userName}</Text>
                  <Text style={styles.cardUserEmail}>{data.userEmail}</Text>
                  <Text numberOfLines={1} style={styles.cardDesc}>
                    {data.desc}
                  </Text>
                  <Text style={styles.cardDateTime}>
                    {data.dateTime.toDateString()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        ))}
      </ScrollView>
    );
  }

  return (<View style={styles.container}>

    <AppointmentCards />
  </View>);
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    paddingHorizontal: 5,
  },

  appointmentCardOuterContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "#F5F8FF",
    borderRadius: 10,
    marginVertical:4
  },
  appointmentCard: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  cardProfileContainer: {
    width: "20%",
    height: "100%",
    objectFit: "contain",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardProfilePic: {
    width: 70,
    height: 70,
    borderRadius: "50%",
  },
  cardContent: {
    width: "80%",
    height: "100%",

    padding: 10,
  },
  cardUserName: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#3C64B1",
  },
  cardUserEmail: {
    marginVertical: 3,
    color: "#666",
  },
  cardDesc: {
    marginVertical: 2,
    color: "#555",
  },
  cardDateTime: {
    color: "#3C64B1",
  },
});
