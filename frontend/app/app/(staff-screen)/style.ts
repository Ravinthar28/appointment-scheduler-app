
import { StyleSheet } from "react-native";


export const homeScreenStyles = StyleSheet.create({
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
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'flex-end',
},

modalContainer: {
  backgroundColor: '#fff',
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  elevation: 5,
},

modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},

modalLabel: {
  fontWeight: '600',
  marginTop: 10,
},

modalText: {
  fontSize: 16,
  color: '#444',
},

modalCloseButton: {
  marginTop: 20,
  backgroundColor: '#1e90ff',
  padding: 10,
  borderRadius: 8,
  alignItems: 'center',
},

modalCloseText: {
  color: '#fff',
  fontWeight: '600',
},

});

export const appointmentStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0d1117',
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1e2732',
    color: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  label: {
    color: '#888',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },
  selector: {
    backgroundColor: '#1e2732',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  selectorText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
