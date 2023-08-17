import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomizedButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor:string;
}

const CustomizedButton: React.FC<CustomizedButtonProps> = ({ title,backgroundColor, onPress }) => (
  <TouchableOpacity style={[styles.button, {backgroundColor:backgroundColor}]} disabled={backgroundColor ==='lightgray'?true:false}  onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    // backgroundColor: 'orange', 
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop:30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomizedButton;
