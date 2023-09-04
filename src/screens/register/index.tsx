import {View, Platform, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Textinput} from '../../components/Textinput';
import styles from './styles';
import {navigationProps, validationProps} from '../../components/type';
import {handleRegister} from '../../apiconfig/firebaseapi';
import ImageHeader from '../../components/ImageHeader';
import BackHeader from '../../components/BackHeader';
import ErrorComponent from '../../components/ErrorComponent';
import ForgotPassword from '../../components/ForgotPassword';
import { useToast } from '../../context/ToastContext';

interface userProps {
  email: string;
  password: string;
}

export const RegisterScreen = () => {
  const {showToast} = useToast();
  const [userData, setUserData] = useState<userProps>({
    email: '',
    password: '',
  });
  const [validationError, setValidationError] = useState<validationProps>({
    emailError: '',
    passwordError: '',
    unknownError: '',
  });
  const {emailError, passwordError, unknownError} = validationError;
  const {email, password} = userData;
  const [spinner, setSpinner] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleFieldChange = (fieldName: keyof userProps, value: any) => {
    setUserData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleError = (fieldName: keyof validationProps, value: string) => {
    setValidationError(prevValidationData => ({
      ...prevValidationData,
      [fieldName]: value,
    }));
  };

  const handleRegisterPressed = async () => {
    if (!email) {
      handleError('emailError', 'Please enter an email address.');
      return;
    }

    if (!password) {
      handleError('passwordError', 'Please enter a password.');
      return;
    }
    setSpinner(true);

    handleRegister(email, password)
      .then((message: any) => {
        showToast(message,'success')
        navigation.navigate('Main');
        setUserData({
          email: '',
          password: '',
        });
        setSpinner(false);
      })
      .catch((errorMessage: any) => {
        if (errorMessage == 'Please enter a valid email address.') {
          console.log('i got n');
          handleError('emailError', errorMessage);
        } else {
          console.log('i got run');
          handleError('unknownError', errorMessage);
        }
        setSpinner(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Spinner visible={spinner} />
      <BackHeader title="Login" />
      <View style={styles.wrapper}>
        <ImageHeader title="Let’s Sign up " marginTop={0} marginBottom={50} />
        <Textinput
          placeholder="Email"
          value={email}
          onChangeText={text => {
            handleFieldChange('email', text);
            handleError('emailError', '');
            handleError('unknownError', '');
          }}
        />
        <ErrorComponent error={emailError} />
        <Textinput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={text => {
            handleFieldChange('password', text);
            handleError('passwordError', '');
            handleError('unknownError', '');
          }}
        />

        <ErrorComponent error={passwordError} />
        <ErrorComponent error={unknownError} />
        <ForgotPassword onPress={() => navigation.navigate('ForgetPassword')} />

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
