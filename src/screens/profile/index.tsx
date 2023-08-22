import {
  View,
  ToastAndroid,
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
import Label from '../../components/Label';
import UserImage from '../../components/UserImage';
import {fetchUserData, updateUserData} from '../../apiconfig/firebaseapi';

interface userProps {
  email: string;
  phone: string;
  name: string;
  userImage: string | undefined;
}
export const ProfileScreen = () => {
  const [userData, setUserData] = useState<userProps>({
    email: '',
    name: '',
    phone: '',
    userImage: undefined,
  });
  const {email, name, phone, userImage} = userData;
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
            email: userData.email || '', // Initialize with default values
            name: userData.name || '',
            phone: userData.phone || '',
            userImage: userData.profileImage || undefined,
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
    updateUserData(name, phone, userImage)
      .then(message => {
        setUpdate(false);
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
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
    if (phone.length < 10 || !name) {
      setButtonColor('lightgray');
    } else {
      setButtonColor('#4B164C');
    }
  }, [phone, name]);

  const handleEdit = () => {
    setUpdate(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Spinner visible={spinner} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.wrapper}>
          <Label
            styles={styles.voiletHeading}
            title={update ? 'Edit Profile' : 'Profile'}
          />
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

          {update ? (
            <CustomButton
              title="Update"
              onPress={handleUpdate}
              marginTop={20}
              backgroundColor={buttonColor}
              textColor={phone.length >= 10 ? 'white' : 'black'}
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
