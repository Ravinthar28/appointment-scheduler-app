
import { StyleSheet } from "react-native";

export const register_styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:60,
    paddingHorizontal:20
  },
  innerContainer:{
    width:"100%",
    height:"100%",
  },
  pageTitle:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    marginVertical:20
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
    fontSize:20,
    fontWeight:"bold"
  }
})