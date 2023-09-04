import React from 'react';
import { View, StyleSheet } from 'react-native';
import Check from 'react-native-vector-icons/AntDesign';
import Exclamation from 'react-native-vector-icons/FontAwesome'; // You can import other icons for different types
import Info from 'react-native-vector-icons/Feather'; // You can import other icons for different types
import Label from './Label';

interface ToastProps {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

const Toast: React.FC<ToastProps> = ({ type, message }) => {
  if (message === '') {
    return null;
  }

  let icon;
  let backgroundColor;

  switch (type) {
    case 'success':
      icon = <Check name="checkcircle" size={16} color="white" style={styles.icon} />;
      backgroundColor = '#4BB543';
      break;
    case 'warning':
      icon = <Exclamation name="exclamation-circle" size={16} color="white" style={styles.icon} />;
      backgroundColor = '#FFA500';
      break;
    case 'error':
      // Use the appropriate icon for error type
      icon = <Exclamation name="exclamation-circle" size={16} color="white" style={styles.icon} />;
      backgroundColor = 'red';
      break;
    case 'info':
      // Use the appropriate icon for info type
      icon = <Info name="info" size={16} color="white" style={styles.icon} />;
      backgroundColor = '#3498db';
      break;
    default:
      backgroundColor = '#4BB543';
      break;
  }

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      {icon}
      <Label title={message} selected={false} styles={styles.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems:'center',
  },
  icon: {
    marginRight: 10,
    
  },
  text: {
    color: 'white',
  },
});

export default Toast;
