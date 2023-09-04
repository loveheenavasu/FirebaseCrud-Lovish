// LocationPicker.tsx
import React, { useState,FC } from 'react';
import { Pressable } from 'react-native';
import { Textinput } from './Textinput';
import { CustomCountryPicker } from '../util/utils';

interface locationProps{
  location:string;
  handleFieldChange: (fieldName: any, value: string) => void;
  update:boolean;
}
const LocationPicker:FC<locationProps> = ({ location, update, handleFieldChange }: any) => {
  const [countryPickerVisible, setCountryPickerVisible] = useState<boolean>(false);

  return (
    <>
      <Pressable
        onPress={() => setCountryPickerVisible(true)}
        disabled={!update}>
        <Textinput
          placeholder="Location"
          value={location}
          onChangeText={text => {}}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
      {countryPickerVisible && (
        <CustomCountryPicker
          visible={countryPickerVisible}
          countryCode="IN"
          onClose={() => setCountryPickerVisible(false)}
          onSelect={country => handleFieldChange('location', country.name)}
        />
      )}
    </>
  );
};

export default LocationPicker;
