import {StyleSheet} from 'react-native';
import { scale } from '../../util/screenSize';

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  wrapper: {
    padding: 30,
  },
  text:{
    color:'black',
    marginVertical:10
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
    height:scale(220)
  }
});
export default styles;
