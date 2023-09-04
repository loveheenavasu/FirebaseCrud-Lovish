import {View, Platform, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Textinput} from '../../components/Textinput';
import styles from './styles';
import ImageHeader from '../../components/ImageHeader';
import {navigationProps, validationProps} from '../../components/type';
import {handleLogin} from '../../apiconfig/firebaseapi';
import ErrorComponent from '../../components/ErrorComponent';
import ForgotPassword from '../../components/ForgotPassword';
import {useToast} from '../../context/ToastContext';

interface userProps {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const {showToast} = useToast();

  const [userData, setUserData] = useState<userProps>({
    email: Platform.OS==='ios'? 'lovishchugh01@gmail.com' : 'lovish@gmail.com',
    password: Platform.OS==='ios'? '1234567' : '123456',
  });
  const [validationError, setValidationError] = useState<validationProps>({
    emailError: '',
    passwordError: '',
    unknownError: '',
  });
  const {emailError, passwordError, unknownError} = validationError;
  const [spinner, setSpinner] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleFieldChange = (fieldName: keyof userProps, value: string) => {
    setUserData(prevUserData => ({...prevUserData, [fieldName]: value}));
  };

  const handleError = (fieldName: keyof validationProps, value: string) => {
    setValidationError(prevValidationData => ({
      ...prevValidationData,
      [fieldName]: value,
    }));
  };

  const handleSignup = () => {
    navigation.navigate('Register');
  };

  const handleLoginPressed = () => {
    const {email, password} = userData;
    console.log('Email:', email);
    console.log('Password:', password);
    setSpinner(true);

    if (!email) {
      handleError('emailError', 'Please enter an email address.');
      setSpinner(false);
      return;
    }
    if (!password) {
      handleError('passwordError', 'Please enter a password.');
      setSpinner(false);
      return;
    }
    setSpinner(true);
    handleLogin(email, password)
      .then((message: any) => {
        navigation.navigate('Main');
        setUserData({
          email: '',
          password: '',
        });
        setSpinner(false);
        showToast(message,'success');
      })
      .catch((errorMessage: any) => {
        if (errorMessage == 'Please provide a valid email address.') {
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
      <View style={styles.wrapper}>
        <ImageHeader
          title="Let’s Sign You In"
          marginTop={50}
          marginBottom={50}
        />
        <Textinput
          placeholder="Email"
          value={userData.email}
          keyboardType="email-address"
          onChangeText={text => {
            handleFieldChange('email', text);
            handleError('emailError', '');
            handleError('unknownError', '');
          }}
        />
        <ErrorComponent error={emailError} />
        <Textinput
          placeholder="Password"
          value={userData.password}
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
          title="Login"
          marginTop={20}
          onPress={handleLoginPressed}
          backgroundColor="#4B164C"
          textColor="white"
        />

        <CustomButton
          title="Signup"
          marginTop={20}
          onPress={handleSignup}
          textColor="#4B164C"
          backgroundColor="#fcf3fb"
        />
      </View>
    </KeyboardAvoidingView>
  );
};
