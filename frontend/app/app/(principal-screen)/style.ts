
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
  body:{
    
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
