import {StyleSheet} from 'react-native';
import { scale } from '../../util/screenSize';

const styles = StyleSheet.create({
  wrapper: {
    padding: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  text:{
    color:'black'
  },
  errortext:{
    color:'red'
  },
  marginTop:{
    position:'absolute',
    bottom:20,
    width:'90%',
    alignSelf:'center',
  },
  image:{
    width:scale(320),
    height:scale(273)
  }
});
export default styles;
