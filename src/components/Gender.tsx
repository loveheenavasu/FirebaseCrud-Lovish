import React, { useState,FC } from 'react';
import { Pressable } from 'react-native';
import { GenderDropdown } from '../util/utils';
import { Textinput } from './Textinput';

interface genderProps{
  gender:string;
  handleFieldChange: (fieldName: any, value: string) => void;
  update:boolean;
}
const GenderPicker:FC<genderProps> = ({ gender, update, handleFieldChange }) => {
  const genderOptions = ['Male', 'Female', 'Transgender'];
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setShowGenderDropdown(!showGenderDropdown)}
        disabled={!update}>
        <Textinput
          placeholder="Gender"
          value={gender}
          onChangeText={text => handleFieldChange('gender', text)}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
      {showGenderDropdown && (
        <GenderDropdown
          options={genderOptions}
          onOptionSelect={selectedGender =>{
            handleFieldChange('gender', selectedGender)
            setShowGenderDropdown(false)
          }
          }
        />
      )}
    </>
  );
};

export default GenderPicker;
