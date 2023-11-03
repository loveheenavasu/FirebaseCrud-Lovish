import {StyleSheet} from 'react-native';
import { scale } from '../../util/screenSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    padding: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  text:{
    color:'#0F2D52A6',
    textAlign:'center',
    marginVertical:scale(10)
  },
  flex:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#f9fafd',
    padding:10,
    borderRadius:30,
    justifyContent:'center'
  },
  mainflex:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
  },
  socialtext:{
    color:'#60748c',
    fontSize:scale(12),
    fontWeight:'500',
    marginLeft:10
  }
});
export default styles;
