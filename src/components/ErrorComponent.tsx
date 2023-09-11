import React from 'react';
import { StyleSheet, View } from 'react-native';
import Exclamationcircle from 'react-native-vector-icons/AntDesign';
import Label from './Label';
import { scale } from '../util/screenSize';

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  if(error == ''){
    return null;
  }
  return (
    <View
      style={styles.container}>
      <Exclamationcircle name="exclamationcircle" size={16} color={'red'} style={styles.icon} />
      <Label title={error} selected={false} styles={styles.errortext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEEFEF',
    padding: 6,
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: 8,
    width:'100%',
    alignSelf:'center',
    
  },
  icon:{
    marginRight: 10
  },
    errortext:{
        color:'red',
        fontSize:scale(13)
    }
})
export default ErrorComponent;
