import {
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import styles from './styles';
import {Textinput} from '../../components/Textinput';
import CustomButton from '../../components/CustomButton';
import ErrorComponent from '../../components/ErrorComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import {changePassword} from '../../apiconfig/firebaseapi';
import { useToast } from '../../context/ToastContext';

interface passwordProps {
  currentPassword: string;
  password: string;
  confirmpassword: string;
}
interface validationProps {
  currentPasswordError: string;
  passwordError: string;
  confirmPasswordError: string;
  unknownError: string;
}
const ChangePassword = ({route}: any) => {
  const {change} = route.params;
  const {showToast} = useToast();

  const [passwordData, setPasswordData] = useState<passwordProps>({
    currentPassword: '',
    password: '',
    confirmpassword: '',
  });
  const {currentPassword, password, confirmpassword} = passwordData;
  const [validationError, setValidationError] = useState<validationProps>({
    currentPasswordError: '',
    passwordError: '',
    confirmPasswordError: '',
    unknownError: '',
  });
  const {
    passwordError,
    confirmPasswordError,
    unknownError,
    currentPasswordError,
  } = validationError;
  const [spinner, setSpinner] = useState<boolean>(false);

  const handleFieldChange = (fieldName: keyof passwordProps, value: string) => {
    setPasswordData(prevUserData => ({...prevUserData, [fieldName]: value}));
  };

  const handleError = (fieldName: keyof validationProps, value: string) => {
    setValidationError(prevValidationData => ({
      ...prevValidationData,
      [fieldName]: value,
    }));
  };
  

  const handleChangePassword = async (
    currentPassword: string,
    password: string,
  ) => {
    setSpinner(true);
    changePassword(currentPassword, password)
      .then(message => {
        showToast(message, 'success')
        setPasswordData({
          currentPassword:'',
          password:'',
          confirmpassword:''
        })
      })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/wrong-password') {
          handleError('currentPasswordError', 'Wrong Old Password!');
        } else if (error.code === 'auth/too-many-requests') {
          handleError(
            'confirmPasswordError',
            'Too Many requests! Try after sometime',
          );
        } else {
          handleError('unknownError', error.code);
        }
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  const handlePassword = () => {
    if (!currentPassword) {
      handleError('currentPasswordError', 'Please enter Password.');
      return;
    }
    if (!password) {
      handleError('passwordError', 'Please enter Password.');
      return;
    }
    if (!confirmpassword) {
      handleError('confirmPasswordError', 'Please enter same password.');
      return;
    }
    if (currentPassword === password) {
      handleError(
        'passwordError',
        'Old password and new password must be different.',
      );
      return;
    }
    if (password !== confirmpassword) {
      handleError('confirmPasswordError', 'Password Do not match.');
      return;
    } else {
      handleChangePassword(currentPassword, password);
    }
  };

  return (
    <Layout title="Change Password" header={true}>
      <Spinner visible={spinner} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        horizontal={false}>
        <View style={styles.wrapper}>
          <Image
            source={require('../../../assets/new_password.png')}
            style={styles.image}
          />
          {change && (
            <Textinput
              placeholder="Old Password"
              value={currentPassword}
              secureTextEntry
              onChangeText={text => {
                handleFieldChange('currentPassword', text);
                handleError('currentPasswordError', '');
                handleError('unknownError', '');
              }}
              label={true}
            />
          )}
          {change && (
            <ErrorComponent error={currentPasswordError} />
          )}
          <Textinput
            placeholder="New Password"
            value={password}
            secureTextEntry
            onChangeText={text => {
              handleFieldChange('password', text);
              handleError('passwordError', '');
              handleError('unknownError', '');
            }}
            label={true}
          />
          <ErrorComponent error={passwordError} />

          <Textinput
            placeholder="Confirm New Password"
            value={confirmpassword}
            secureTextEntry
            onChangeText={text => {
              handleFieldChange('confirmpassword', text);
              handleError('confirmPasswordError', '');
              handleError('unknownError', '');
            }}
            label={true}
          />
          <ErrorComponent error={confirmPasswordError} />
          <ErrorComponent error={unknownError} />
        </View>
      </ScrollView>

      <View style={styles.marginTop}>
        <CustomButton
          title="Save"
          marginTop={0}
          onPress={handlePassword}
          backgroundColor="#4B164C"
          textColor="white"
        />
      </View>
    </Layout>
  );
};

export default ChangePassword;
