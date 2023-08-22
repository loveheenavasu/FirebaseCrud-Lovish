import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  marginTop: number;
  textColor: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  backgroundColor,
  marginTop,
  textColor,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      {backgroundColor: backgroundColor, marginTop: marginTop},
    ]}
    disabled={backgroundColor === 'lightgray' ? true : false}
    onPress={onPress}>
    <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
