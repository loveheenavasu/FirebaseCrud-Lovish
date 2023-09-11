import {View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import styles from './styles';
import {Textinput} from '../../components/Textinput';
import CustomButton from '../../components/CustomButton';
import ErrorComponent from '../../components/ErrorComponent';
import {useToast} from '../../context/ToastContext';
import {useAppDispatch, useAppSelector} from '../../services/redux/hooks';
import {changePassword, selectLoading} from '../../services/redux/authSlice';
import Loader from '../../util/Loader';

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
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading)

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

  const handleFieldChange = (fieldName: keyof passwordProps, value: string) => {
    handleError('confirmPasswordError', '');
    handleError('passwordError', '');
    handleError('unknownError', '');
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
    dispatch(
      changePassword({
        currentPassword,
        password,
      }),
    )
      .unwrap()
      .then(message => {
        console.log(message);
        showToast(message, 'success');
        setPasswordData({
          currentPassword: '',
          password: '',
          confirmpassword: '',
        });
      })
      .catch(error => {
        // console.log(error);
        
        if (error.message === '[auth/wrong-password] The password is invalid or the user does not have a password.') {
          handleError('currentPasswordError', 'Wrong Old Password!');
        } else if (error.message === '[auth/too-many-requests]') {
          handleError(
            'confirmPasswordError',
            'Too Many requests! Try after sometime',
          );
        } else if(error.message === "[auth/weak-password] The given password is invalid.") {
          handleError('unknownError', "Weak password!");
        } else {
          handleError('unknownError', error.message);
        }
      })
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
      <Loader Visible={loading} />
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
          {change && <ErrorComponent error={currentPasswordError} />}
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
        <View style={styles.marginTop}>
          <CustomButton
            title="Save"
            marginTop={0}
            onPress={handlePassword}
            backgroundColor="#4B164C"
            textColor="white"
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default ChangePassword;
