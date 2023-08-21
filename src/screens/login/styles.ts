import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  orangeHeading: {
    color: 'orange',
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    width: '80%',
    flex: 1,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default styles;
