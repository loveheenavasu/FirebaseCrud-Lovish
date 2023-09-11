import {View, Platform, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Textinput} from '../../components/Textinput';
import styles from './styles';
import ImageHeader from '../../components/ImageHeader';
import {navigationProps, validationProps} from '../../components/type';
import ErrorComponent from '../../components/ErrorComponent';
import ForgotPassword from '../../components/ForgotPassword';
import {useToast} from '../../context/ToastContext';
import {useAppDispatch, useAppSelector} from '../../services/redux/hooks';
import Loader from '../../util/Loader';
import {loginUser, selectLoading} from '../../services/redux/authSlice';
import { validateEmail } from '../../util/validation';

interface userProps {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const {showToast} = useToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

  const [userData, setUserData] = useState<userProps>({
    email:
      Platform.OS === 'ios' ? 'lovishchugh01@gmail.com' : 'lovish@gmail.com',
    password: Platform.OS === 'ios' ? '1234567' : '123456',
  });
  const [validationError, setValidationError] = useState<validationProps>({
    emailError: '',
    passwordError: '',
    unknownError: '',
  });
  const {emailError, passwordError, unknownError} = validationError;
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
  setValidationError({
    emailError: '',
    passwordError: '',
    unknownError: '',
  })
  const { email, password } = userData;
  if (!email) {
    handleError('emailError', 'Please enter an email address.');
    return;
  }
  if (!password) {
    handleError('passwordError', 'Please enter a password.');
    return;
  }
  if (!validateEmail(email)) {
    handleError('emailError', 'Please enter a valid email address.');
    return;
  }

  dispatch(loginUser({ email, password }))
    .unwrap()
    .then(() => {
      setUserData({
        email: 'sdf',
        password: '',
      });
      showToast('Logged in successfully', 'success');
    })
    .catch((error: any) => {
      const errorMessage = error.message;
      if (
        errorMessage === 'Please provide a valid email address.' ||
        errorMessage === 'That email address does not exist!'
      ) {
        console.log('i got n');
        handleError('emailError', errorMessage);
      } else {
        console.log('i got run');
        handleError('unknownError', errorMessage);
      }
    });
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Loader Visible={loading} />
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
