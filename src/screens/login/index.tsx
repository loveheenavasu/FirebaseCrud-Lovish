import {
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {validateEmail} from '../../util/validation';
import Google from 'react-native-vector-icons/AntDesign';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Label from '../../components/Label';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {scale} from '../../util/screenSize';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';

interface userProps {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const {showToast} = useToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    if (Platform.OS === 'android') {
      GoogleSignin.configure({
        webClientId:
          '171719846677-bf6kuj4vbn6ii72uci4skt2t2c4qft3b.apps.googleusercontent.com',
      });
    } else {
      GoogleSignin.configure();
    }
  });

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
    });
    const {email, password} = userData;
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

    dispatch(loginUser({email, password}))
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
  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with Google credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const user = userCredential.user;

      // Check if the user exists in Firestore
      const userRef = firestore().collection('users').doc(user.uid);
      const userDoc = await userRef.get();

      // If the user document does not exist, create it
      if (!userDoc.exists) {
        await userRef.set({
          email: user.email,
          name: '', // You can set other fields here
          phone: '',
          profileImage: '',
          location: '',
          dob: '',
          gender: '',
          bio: '',
        });
      }

      // Handle any other logic you need after Google sign-in
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleFacebookSignin = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
  
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
  
      // Once signed in, get the user's AccessToken
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        throw 'Something went wrong obtaining the access token';
      }
  
      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
  
      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(facebookCredential);
      const user = userCredential.user;
  
      // Check if the user exists in Firestore
      const userRef = firestore().collection('users').doc(user.uid);
      const userDoc = await userRef.get();
  
      // If the user document does not exist, create it
      if (!userDoc.exists) {
        await userRef.set({
          email: user.email,
          name: '', // You can set other fields here
          phone: '',
          profileImage: '',
          location: '',
          dob: '',
          gender: '',
          bio: '',
        });
      }
  
      // Handle any other logic you need after Facebook sign-in
    } catch (error:any) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Prompt the user to link their accounts or choose another action
        // You can implement a UI for this prompt and use Firebase methods to link accounts
        console.error('User with the same email exists with different credentials.');
        showToast('Account with the same email exists with different credentials.', 'error');
      } else {
        console.error('Facebook Sign-In Error:', error.message);
      }
  }};
  
  

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
        <Label
          title="Or Log In Using Email"
          selected={false}
          styles={styles.text}
        />
        <View style={styles.mainflex}>
          <TouchableOpacity style={styles.flex} onPress={handleGoogleSignin}>
            <Google name="google" size={scale(13)} color={'#60748c'} />
            <Label
              title="Log In with Google"
              selected={false}
              styles={styles.socialtext}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flex} onPress={handleFacebookSignin}>
            <Google name="google" size={scale(13)} color={'#60748c'} />
            <Label
              title="Log In with facebook"
              selected={false}
              styles={styles.socialtext}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
