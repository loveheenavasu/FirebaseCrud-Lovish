import {
  View,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Textinput} from '../../components/Textinput';
import Label from '../../components/Label';
import styles from './styles';
import ImageHeader from '../../components/ImageHeader';
import {navigationProps} from '../../components/type';
import {handleLogin} from '../../apiconfig/firebaseapi';

interface userProps {
  email: string;
  password: string;
}
export const LoginScreen = () => {
  const [userData, setUserData] = useState<userProps>({
    email: 'lovish@gmail.com',
    password: '123456',
  });
  const [error, setError] = useState<any>(null);
  const [spinner, setSpinner] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleFieldChange = (fieldName: keyof userProps, value: string) => {
    setError(null);
    setUserData(prevUserData => ({...prevUserData, [fieldName]: value}));
  };

  const handleSignup = () => {
    navigation.navigate('Register');
  };

  const handleLoginPressed = () => {
    const {email, password} = userData;
    console.log('Email:', email);
    console.log('Password:', password);
    setSpinner(true);

    if (!email || !password) {
      setError('Please enter an email address and password.');
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
          onChangeText={text => handleFieldChange('email', text)}
        />
        <Textinput
          placeholder="Password"
          value={userData.password}
          secureTextEntry
          onChangeText={text => handleFieldChange('password', text)}
        />
        {error && <Label styles={styles.errorText} title={error} />}
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
