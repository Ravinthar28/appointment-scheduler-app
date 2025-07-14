
import { StyleSheet,Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0c10',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  image: {
    width: width,
    height: 220,
    borderRadius: 30,
    marginBottom: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputBox: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    width: '100%',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    paddingHorizontal: 12,
    width: '100%',
  },
  forgotText: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 20,
    alignSelf: 'flex-start',
    maxWidth: 350,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1c1c1e',
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
    backgroundColor: '#000',
  },
  toggleText: {
    color: '#ccc',
    fontWeight: '600',
  },
  toggleTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  signInButton: {
    backgroundColor: '#2979ff',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    maxWidth: 350,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 350,
  },
});


export const registerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0c10',
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
  },
  passwordWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#1c1c1e',
  borderRadius: 10,
  paddingHorizontal: 12,
  width: '100%',
},

  inputBox: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 15,
  },
  input: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    width: '100%',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '100%',
    maxWidth: 350,
  },
  toggleButton: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  toggleSelected: {
    backgroundColor: '#2d2e30',
  },
  toggleText: {
    color: '#ccc',
    fontWeight: '600',
    fontSize: 14,
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
    maxWidth: 350,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#0b0c10',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



export const styles = StyleSheet.create({
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
    padding: 12,
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
});
