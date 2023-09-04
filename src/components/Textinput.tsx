// TextInputComponent.tsx
import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  Text,
  View,
} from 'react-native';

interface TextInputProps extends RNTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  label?: boolean;
}

export const Textinput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  label,
  ...restProps
}) => {
  return (
    <View>
      {label && (
        <Text style={styles.text}>
          {placeholder}
          <Text style={{color: 'red', justifyContent: 'center'}}>*</Text>
        </Text>
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="black"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 5,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent:'center',
  },
});
