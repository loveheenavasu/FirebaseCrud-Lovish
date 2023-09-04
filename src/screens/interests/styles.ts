import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderWidth: 2,
    borderColor: 'lightgray',
    width: 'auto',
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:18,
  },
  marginTop:{
    marginTop:'auto',
  },
  text: {
    color: 'black',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  selectedCard: {
    borderColor: '#EF5DA8',
    color:'#EF5DA8'
  },
});
export default styles;
