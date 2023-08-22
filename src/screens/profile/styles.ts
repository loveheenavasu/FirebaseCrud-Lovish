import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  wrapper: {
    padding: 40,
  },
  voiletHeading: {
    color: '#4B164C',
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
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  imageCapture: {
    borderWidth: 1,
    borderColor: 'black',
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
    backgroundColor: 'lightgray',
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
    borderColor: '#4B164C',
    borderRadius: 10,
  },
  camera: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'lightgray',
  },
});
export default styles;
