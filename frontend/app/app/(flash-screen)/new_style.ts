import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Style for the ImageBackground component
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Aligns content to the bottom
  },
  // Style for the LinearGradient overlay on top of the image
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50, // Pushes content up from the bottom edge
  },
  // Container for the text and buttons
  content: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50, // Adds space above the content
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 100,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#1F3988',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    paddingBottom: 10, // Adds space above the button
    marginTop: -60, // Adds space below the button
  },
  registerButton: {
    backgroundColor: '#1F3988',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.33,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export const index_styles = StyleSheet.create({
  imgBg: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50, // Pushes content up from the bottom edge
  },
  modalInnerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: "100%",
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clgLogo: {
    width: 300,
    height: 150,
  },
  logoTxt : {
    fontSize:25,
    fontWeight:"400",
    color:"#ffffff",
    letterSpacing:3
  },
  appLogo:{
    width:150,
    height:100
  },
  appLogoTxt:{
    textAlign:"center"
  }
});

