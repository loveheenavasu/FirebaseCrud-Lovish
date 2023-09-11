import {View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Label from '../../components/Label';
import ForgotPasswordCard from '../../components/ForgotPasswordCard';
import CustomButton from '../../components/CustomButton';
import ErrorComponent from '../../components/ErrorComponent';
import Layout from '../../components/Layout';
import {useToast} from '../../context/ToastContext';
import {useAppDispatch} from '../../services/redux/hooks';
import {sendPasswordResetEmail} from '../../services/redux/authSlice';

const ForgetPasswordScreen = () => {
  const {showToast} = useToast();
  const [email, setEmail] = useState<string>('lovishchugh01@gmail.com');
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleFieldChange = (text: any) => {
    setError('');
    setEmail(text);
  };
  // const handleReset = () => {
  //   console.log(email);
  //   if (!email) {
  //     setError('Please Enter email.');
  //     return;
  //   }

  //   sendPasswordResetEmail(email)
  //     .then(message => {
  //       showToast(message,'success');
  //       setEmail('')
  //     })
  //     .catch(error => {
  //       showToast(error.message,'error');
  //     });
  // };
  const handleReset = () => {
    console.log(email);
    if (!email) {
      setError('Please Enter email.');
      return;
    }

    dispatch(sendPasswordResetEmail(email))
      .unwrap()
      .then(message => {
        showToast(message, 'success');
        setEmail('');
      })
      .catch(error => {
        if (
          error.message ===
          '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.'
        ){
          showToast('User Not Found!', 'error');
        } else{
          showToast(error.message, 'error');
        }
      });
  };

  return (
    <Layout header={true} title="Forgot Password">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.wrapper}>
          <Image
            source={require('../../../assets/forgot_password.png')}
            style={styles.image}
          />
          <Label
            selected={false}
            title="Select which contact should we use to reset your password"
            styles={styles.text}
          />
          <ForgotPasswordCard handleFieldChange={handleFieldChange} />
          <ErrorComponent error={error} />
        </View>
      </ScrollView>
      <View style={styles.marginTop}>
        <CustomButton
          title="Send Reset Email"
          onPress={handleReset}
          marginTop={0}
          backgroundColor="#4B164C"
          textColor="white"
        />
      </View>
    </Layout>
  );
};
export default ForgetPasswordScreen;
