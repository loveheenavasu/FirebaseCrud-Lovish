import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomizedButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor:string;
  marginTop:number;
}

const CustomizedButton: React.FC<CustomizedButtonProps> = ({ title,backgroundColor, marginTop, onPress }) => (
  <TouchableOpacity style={[styles.button, {backgroundColor:backgroundColor, marginTop:marginTop}]} disabled={backgroundColor ==='lightgray'?true:false}  onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomizedButton;
