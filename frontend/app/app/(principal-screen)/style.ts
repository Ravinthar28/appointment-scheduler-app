
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
