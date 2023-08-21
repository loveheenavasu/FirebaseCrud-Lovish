import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 35,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  wrapper: {
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
  imageCapture: {
    borderWidth: 1,
    borderColor: 'white',
    width: '50%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 150,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cross: {
    position: 'absolute',
    right: 5,
    top: 5,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 40,
  },
  camera: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'white',
  },
});
export default styles;
