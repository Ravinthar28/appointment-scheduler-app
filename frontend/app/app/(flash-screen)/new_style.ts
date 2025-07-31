
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center', // Center content vertically within the gradient
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns content to the bottom
    alignItems: 'center',
    paddingBottom: 50, // Adjust as needed to move content up from the bottom
    width: '100%',
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
    color: '#ccc', // A slightly lighter color for subtitle
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#4A6296', // A darker blue similar to the image
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 15,
    width: '80%', // Adjust width as needed
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  registerButton: {
    backgroundColor: '#4A6296', // Same color as login button
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    width: '80%', // Adjust width as needed
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});