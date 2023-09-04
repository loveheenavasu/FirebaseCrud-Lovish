import React from 'react';
import {StyleSheet, View} from 'react-native';
import Check from 'react-native-vector-icons/AntDesign';
import Label from './Label';

interface SuccessComponentProps {
  message: string;
}

const SuccessComponent: React.FC<SuccessComponentProps> = ({message}) => {
    if(message ==''){
        return null;
    }
  return (
    <View style={styles.container}>
      <Check
        name="checkcircle"
        size={16}
        color={'white'}
        style={styles.icon}
      />
      <Label title={message} selected={false} styles={styles.errortext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4BB543',
    padding: 6,
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 8,
    paddingHorizontal: 10,
  },
  icon:{
    marginRight: 10
  },
  errortext: {
    color: 'white',
  },
});
export default SuccessComponent;
