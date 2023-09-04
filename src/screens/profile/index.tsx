import {
  View,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {Textinput} from '../../components/Textinput';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import UserImage from '../../components/UserImage';
import {fetchUserData, updateUserData} from '../../apiconfig/firebaseapi';
import DOBComponent from '../../components/DOB';
import LocationPicker from '../../components/LocationPicker';
import GenderPicker from '../../components/Gender';
import { useToast } from '../../context/ToastContext';
import BackHeader from '../../components/BackHeader';

interface userProps {
  email: string;
  phone: string;
  name: string;
  userImage: string | undefined;
  dob: string;
  location: string;
  gender: string;
  bio: string;
}
export const ProfileScreen = () => {
  const {showToast} = useToast();

  const [userData, setUserData] = useState<userProps>({
    email: '',
    name: '',
    phone: '',
    userImage: undefined,
    dob: '',
    location: '',
    gender: '',
    bio: '',
  });
  const {email, name, phone, userImage, dob, location, gender, bio} = userData;
  const [update, setUpdate] = useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState<string>('lightgray');
  const [spinner, setSpinner] = useState<boolean>(false);
  
  const handleFieldChange = (fieldName: keyof userProps, text: string) => {
    setUserData(prevData => ({
      ...prevData,
      [fieldName]: text,
    }));
  };
  useEffect(() => {
    setSpinner(true);
    fetchUserData()
      .then(userData => {
        if (userData) {
          setUserData({
            email: userData.email || '',
            name: userData.name || '',
            phone: userData.phone || '',
            userImage: userData.profileImage || undefined,
            dob: userData.dob,
            location: userData.location,
            gender: userData.gender,
            bio: userData.bio,
          });
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setSpinner(false);
      });
  }, []);

  const handleUpdate = async () => {
    if (!name) {
      Alert.alert('Please enter your name.');
      return;
    }

    if (!phone) {
      Alert.alert('Please enter your phone number.');
      return;
    }
    updateUserData(name, phone, userImage, dob, location, gender, bio)
      .then(message => {
        setUpdate(false);
        showToast(message,'success')
        console.log('User data updated successfully');
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      })
      .finally(() => {
        setSpinner(false);
      });
  };
  useEffect(() => {
    const allFieldsFilled =
      !!userImage &&
      !!name &&
      !!phone &&
      !!dob &&
      !!location &&
      !!gender &&
      !!bio;

    if (!allFieldsFilled) {
      setButtonColor('lightgray');
    } else {
      setButtonColor('#4B164C');
    }
  }, [userImage, name, phone, dob, location, gender, bio]);

  const handleEdit = () => {
    setUpdate(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Spinner visible={spinner} />
      <BackHeader title={update ? 'Edit Profile' : 'Profile'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.wrapper}>
          <UserImage
            source={userImage}
            size={150}
            handleImageChange={image => handleFieldChange('userImage', image)}
            update={update}
          />
          <Textinput
            placeholder="Email"
            value={email}
            editable={false}
            onChangeText={() => {}}
          />
          <Textinput
            placeholder="Name"
            value={name}
            onChangeText={text => handleFieldChange('name', text)}
            editable={update}
          />
          <Textinput
            placeholder="Phone Number"
            value={phone}
            keyboardType="number-pad"
            onChangeText={text => handleFieldChange('phone', text)}
            editable={update}
          />

          <DOBComponent
            userData={userData}
            handleFieldChange={handleFieldChange}
            update={update}
          />

          <LocationPicker
            location={location}
            update={update}
            handleFieldChange={handleFieldChange}
          />
          <GenderPicker
            gender={gender}
            update={update}
            handleFieldChange={handleFieldChange}
          />

          <Textinput
            placeholder="Bio"
            value={userData.bio}
            onChangeText={text => handleFieldChange('bio', text)}
            editable={update}
            multiline
            numberOfLines={4}
          />

          {update ? (
            <CustomButton
              title="Update"
              onPress={handleUpdate}
              marginTop={20}
              backgroundColor={buttonColor}
              textColor={buttonColor == 'lightgray' ? 'black' : 'white'}
            />
          ) : (
            <CustomButton
              title="Edit"
              onPress={handleEdit}
              marginTop={20}
              backgroundColor="#4B164C"
              textColor="white"
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
