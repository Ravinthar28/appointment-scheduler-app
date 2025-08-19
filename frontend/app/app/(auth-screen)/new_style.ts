
import { StyleSheet } from "react-native";

export const register_styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:60,
    paddingHorizontal:20
  },
  dropdownContainer: {
  backgroundColor: "#D9D9D9",
  borderRadius: 20,
  width: "100%",
  marginTop: 5,
},
dropdown: {
  color: "#000",
  backgroundColor: "#D9D9D9",
  fontSize: 16,
  width: "100%",
  height: 50,
  cursor: "pointer",
  borderRadius: 15,
},

  outerContainer: {
    width:"100%",
    height:"100%",
    maxHeight:600,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  innerContainer:{
    width:"100%",
    height:"100%",
  },
  pageTitle:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    marginVertical:30
  },
  
  pageTitleIcon:{
    width:"20%",
    display:"flex",
    alignItems:"center",
    cursor:"pointer"
  },
  pageTitleContent:{
    color:"white",
    fontFamily:"sans-serif",
    fontSize:30,
    marginLeft:50,
    fontWeight:"bold"
  },
  personalInfoTitle:{
    color:"white",
    fontSize:23,
    fontWeight:"bold"
  },
  inputFormContainer:{
    marginVertical:30,
    width:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column"
  },
  inputBox: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
    fontWeight: '500',
  },
  requiredAsteriskRed: {
    color: 'red',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#D9D9D9',
    color: '#000000',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    width: '100%',
  },
  passwordWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#D9D9D9',
  borderRadius: 10,
  paddingHorizontal: 12,
  width: '100%',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 25,
    marginBottom: 20,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 350,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  toggleSelected: {
    backgroundColor: '#1E1E1E',
  },
  toggleText: {
    color: '#ccc',
    fontWeight: '600',
  },
  toggleTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  nextButton: {
    backgroundColor: '#b0cdee',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    maxWidth: 250,
    alignItems: 'center',
    marginTop:40
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    cursor:"pointer"
  },
})