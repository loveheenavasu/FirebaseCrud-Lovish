import {
  View,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import {Textinput} from '../../components/Textinput';
import styles from './styles';
import Label from '../../components/Label';
import UserImage from '../../components/UserImage';
import {navigationProps} from '../../components/type';
import {handleRegister} from '../../apiconfig/firebaseapi';

interface userProps {
  email: string;
  password: string;
  userImage: string | undefined;
}

export const RegisterScreen = () => {
  const [userData, setUserData] = useState<userProps>({
    email: '',
    password: '',
    userImage: undefined,
  });
  const {email, password, userImage} = userData;
  const [error, setError] = useState<any>(null);
  const [spinner, setSpinner] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleFieldChange = (fieldName: keyof userProps, value: any) => {
    setError(null);
    setUserData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleRegisterPressed = async () => {
    if (!email || !password) {
      setError('Please enter an email address and password.');
      setSpinner(false);
      return;
    }
    if (!userImage) {
      setError('Please select image!');
      setSpinner(false);
      return;
    }
    setSpinner(true);

    handleRegister(email, password, userImage)
      .then((message: any) => {
        navigation.navigate('Main');
        setUserData({
          email: '',
          password: '',
          userImage: undefined,
        });
        setSpinner(false);
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      })
      .catch((errorMessage: any) => {
        setError(errorMessage);
        setSpinner(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Spinner visible={spinner} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <BackIcon name="arrow-back" size={30} color="#4B164C" />
        <Label styles={{color: '#4B164C', fontSize: 18}} title="Login" />
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Label styles={styles.voiletHeading} title="Register Screen" />
        <UserImage
          source={userImage}
          size={150}
          handleImageChange={image => handleFieldChange('userImage', image)}
          update={true}
        />
        <Textinput
          placeholder="Email"
          value={email}
          onChangeText={text => handleFieldChange('email', text)}
        />
        <Textinput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={text => handleFieldChange('password', text)}
        />

        {error && <Label styles={styles.errorText} title={error} />}
        <CustomButton
          title="Register"
          onPress={handleRegisterPressed}
          marginTop={30}
          backgroundColor="#4B164C"
          textColor="white"
        />
      </View>
    </KeyboardAvoidingView>
  );
};
