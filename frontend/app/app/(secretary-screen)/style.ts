
import { StyleSheet } from "react-native";
import { green } from "react-native-reanimated/lib/typescript/Colors";

export const new_principal_styles = StyleSheet.create({
  container: {
    flex: 1, // Adjust for status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#3E5793', // Dark blue background for header to match design
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  welcomeCard: {
    backgroundColor: '#3E5793', // Dark blue
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  welcomeDescription: {
    fontSize: 14,
    color: '#E0E8F7',
    lineHeight: 20,
  },
  todayScheduleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
  },
  scheduleList: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for bottom nav bar
  },
  scheduleItemCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timeContainer: {
    alignItems: 'flex-end',
    marginRight: 15,
  },
  timeStart: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timeEnd: {
    fontSize: 14,
    color: '#888',
  },
  verticalLine: {
    width: 4,
    height: '100%',
    backgroundColor: '#3E5793', // Dark blue
    borderRadius: 2,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  meetingType: {
    fontSize: 13,
    color: '#888',
    marginBottom: 3,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  meetingDetails: {
    fontSize: 13,
    color: '#666',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3E5793', // Dark blue
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
  },
  navItem: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555',
    marginRight: 10,
  },
  cardName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardTime: {
    color: '#ccc',
    fontSize: 12,
  },
  cardMessage: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // semi-transparent background
  },
  modalView: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  modalProfilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  modalBoldText: {
    fontWeight: 'bold',
  },
  modalReasonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  modalReasonText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalDateTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalAcceptButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  modalRejectButton: {
    flex: 1,
    backgroundColor: "#F44336",
    borderRadius: 10,
    paddingVertical: 12,
    marginLeft: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export const cancel_styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F8FF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#3E5793",
    padding: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#E6E9F0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#A8B3C7",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  staffAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardTitleContainer: {
    flex: 1,
  },
  staffName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  staffEmail: {
    fontSize: 12,
    color: "#666",
  },

  cardContent: {
    flexDirection: "row",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginRight: 5,
  },
  subText: {
    flex: 1,
    fontSize: 14,
    color: "#555",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1C4A9E",
    borderRadius: 30,
    paddingVertical: 15,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeNavItem: {
    backgroundColor: "#2E69D8",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const cancel_modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalStaffName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C64B1",
  },
  modalStaffEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  modalContent: {
    width: "100%",
  },
  modalDescription: {
    backgroundColor: "#E6E9F0",
    padding: 15,
    borderRadius: 10,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#000",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputTime: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rescheduleButton: {
    backgroundColor: "#008000",
    borderRadius: 50,
    paddingVertical: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  rescheduleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
