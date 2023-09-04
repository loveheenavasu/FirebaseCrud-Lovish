import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f9',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  wrapper: {
    padding: 15,
  },
  voiletHeading: {
    color: '#4B164C',
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center', // Center the TextInput vertically
  },
});
export default styles;
