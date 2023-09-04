import React, { useState, FC } from 'react';
import { Pressable } from 'react-native';
import { CustomDatePicker } from '../util/utils';
import { Textinput } from './Textinput';

interface UserData {
  dob: string;
}
interface dobProps{
  userData:UserData;
  handleFieldChange: (fieldName: keyof UserData, value: string) => void;
  update:boolean;
}
const DOBComponent:FC <dobProps> = ({ userData, handleFieldChange, update }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleDateConfirm = (date: Date) => {
    setOpenDatePicker(false);
    const day = date.getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    handleFieldChange('dob', formattedDate);
  };

  return (
    <>
      <Pressable onPress={() => setOpenDatePicker(true)} disabled={!update}>
        <Textinput
          placeholder="Date of Birth"
          value={userData.dob}
          onChangeText={(text) => handleFieldChange('dob', text)}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
      <CustomDatePicker
        open={openDatePicker}
        onClose={() => setOpenDatePicker(false)}
        onConfirm={handleDateConfirm}
      />
    </>
  );
};

export default DOBComponent;
