import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  flex:{
    marginTop:'auto',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  buttonWidth:{width: '48%'},
  text:{
    color: 'black',
    fontWeight: '500',
    marginLeft: 5,
    marginTop:10,
  },
});
export default styles;
