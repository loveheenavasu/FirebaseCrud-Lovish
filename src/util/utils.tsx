import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import CountryPicker from 'react-native-country-picker-modal';
import Label from '../components/Label';

interface GenderDropdownProps {
  options: string[];
  onOptionSelect: (selectedOption: string) => void;
}

export const GenderDropdown: React.FC<GenderDropdownProps> = ({
  options,
  onOptionSelect,
}) => {
  return (
    <View style={styles.dropdownContainer}>
      {options.map((item, i) => {
        return (
          <Pressable
            onPress={() => {
              onOptionSelect(item);
            }}
            key={i}
            style={styles.dropdownItem}>
            <Label styles={styles.text} selected={false} title={item} />
          </Pressable>
        );
      })}
    </View>
  );
};

interface CustomDatePickerProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <DatePicker
      modal
      open={open}
      mode="date"
      date={new Date()}
      onConfirm={onConfirm}
      onCancel={onClose}
    />
  );
};

interface CustomCountryPickerProps {
  visible: boolean;
  countryCode: string;
  onClose: () => void;
  onSelect: (country: any) => void;
}

export const CustomCountryPicker: React.FC<CustomCountryPickerProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  return (
    <CountryPicker
      visible={visible}
      countryCode="IN"
      onClose={onClose}
      onSelect={onSelect}
      withAlphaFilter
      withCountryNameButton
      withEmoji
      withFilter
      withFlag
      withCallingCode
    />
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: 'transparent',
    zIndex: 1,
    paddingHorizontal: 8,
    width: '40%',
  },
  dropdownItem: {
    paddingVertical: 10,
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  text: {
    color: 'black',
  },
});
