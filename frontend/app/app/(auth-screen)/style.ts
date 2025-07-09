
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

export const staffhomepageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0c10',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  profileTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  name: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  role: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 14,
  },
  email: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 13,
    marginBottom: 15,
  },
  appointmentButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#2979ff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  appointmentText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tabText: {
    color: '#aaa',
    fontWeight: '500',
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#2979ff',
  },
  tabTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#ccc',
    fontSize: 13,
  },
});

