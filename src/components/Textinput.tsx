// TextInputComponent.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps as RNTextInputProps } from 'react-native';

interface TextInputProps extends RNTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
}

export const CustomTextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  ...restProps
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="white"
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
});

