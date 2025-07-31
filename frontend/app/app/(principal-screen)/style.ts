
import { StyleSheet } from "react-native";
import { green } from "react-native-reanimated/lib/typescript/Colors";

export const principalHome = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#111',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#222',
  },
  tabSelected: {
    backgroundColor: '#444',
  },
  tabText: {
    color: '#aaa',
  },
  tabTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  appointmentList: {
    marginTop: 10,
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
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginLeft: 10,
  },
  formHeading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#4D90FE',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    color: '#ccc',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
  },
  modelMsgOuterBox: {
    backgroundColor:"#333",
    width:"100%",
    height:"auto",
    borderRadius:10,
    padding:10,
    marginBottom:10,
  },
  modelMsgBox: {
    width:"100%",
    height:"auto",
    marginBottom:10,
  },
  modelMsg:{
    width:"100%",
    height:"auto",
  },
  modelUserName: {
    color:"#fff",
    fontWeight:"bold",
    fontSize:18
  },
  modelDesc: {
    color:"#fff",
    marginVertical:5
  },
  modelDateTime: {
    color:"#fff"
  },
  modelBtnOuterContainer:{
    width:"100%",
    height:"auto",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around"
  },
  modelBtnContainer: {
    height:"auto",
    alignItems:"center",
    justifyContent:"center",
  },
  modelMsgAcceptBtn: {
    backgroundColor:"#5cb85c",
    paddingVertical:4,
    paddingHorizontal:30,
    borderRadius:5,
    borderWidth:0,
  },
  modelMsgCancelBtn: {
    backgroundColor:"#ED2B00",
    paddingVertical:4,
    paddingHorizontal:30,
    borderRadius:5,
    borderWidth:0,
  }
});

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
})
