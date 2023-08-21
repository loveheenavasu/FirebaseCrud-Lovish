import {
  View,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import CustomizedButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import {CustomTextInput} from '../../components/Textinput';
import {validateEmail} from '../../util/validation';
import Label from '../../components/Label';
import styles from './styles';

interface userProps {
  email: string;
  password: string;
}

type navigationProps = {
  Register: undefined;
  Home: undefined;
};

export const LoginScreen = () => {
  const [userData, setUserData] = useState<userProps>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<any>(null);
  const [spinner, setSpinner] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleEmailChange = (text: string) => {
    setError(null);
    setUserData(prevUserData => ({...prevUserData, email: text}));
  };

  const handlePasswordChange = (text: string) => {
    setError(null);
    setUserData(prevUserData => ({...prevUserData, password: text}));
  };

  const handleLogin = () => {
    // Perform your login logic here using the email and password state values
    const {email, password} = userData;
    if (!email) {
      setError('Please enter an email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
    setSpinner(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
        navigation.navigate('Home');
        setUserData({
          email: '',
          password: '',
        });
        setSpinner(false);
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravityAndOffset(
            'Logged in successfully!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      })
      .catch((error: any) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          setError('That email address does not exist!');
        }
        if (error.code === 'auth/wrong-password') {
          setError('Wrong password!');
        }
        setSpinner(false);

        console.log(error);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Spinner visible={spinner} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={{paddingVertical: 10, marginLeft: '80%'}}>
        <Label styles={{fontSize: 20, color: 'orange'}} title="Register" />
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Label styles={styles.orangeHeading} title={'LoginScreen'} />
        <CustomTextInput
          placeholder="Email"
          value={userData.email}
          keyboardType="email-address"
          onChangeText={handleEmailChange}
        />
        <CustomTextInput
          placeholder="Password"
          value={userData.password}
          secureTextEntry
          onChangeText={handlePasswordChange}
        />
        {error && <Label styles={styles.errorText} title={error} />}
        <CustomizedButton
          title="Login"
          marginTop={30}
          onPress={handleLogin}
          backgroundColor="orange"
        />
      </View>
    </KeyboardAvoidingView>
  );
};
