
import { StyleSheet,Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0b0c10',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.08,
    paddingHorizontal: width * 0.06,
  },
  image: {
    width: width * 0.85,
    height: height * 0.3,
    marginBottom: height * 0.05,
    borderRadius: 20,
  },
  heading: {
    color: '#ffffff',
    fontSize:
      width < 360 ? 17 : width < 480 ? 19 : width < 768 ? 22 : 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: height * 0.05,
  },
  loginButton: {
    backgroundColor: '#2979ff',
    paddingVertical: height * 0.018,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  registerButton: {
    backgroundColor: '#1f1f1f',
    paddingVertical: height * 0.018,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width < 360 ? 14 : 16,
  },
  buttonTextAlt: {
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: width < 360 ? 14 : 16,
  },
  footer: {
    color: '#999',
    fontSize: width < 360 ? 11 : 13,
    textAlign: 'center',
    marginBottom: 30,
  },
});