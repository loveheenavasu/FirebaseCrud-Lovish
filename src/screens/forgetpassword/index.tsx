import {View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Label from '../../components/Label';
import ForgotPasswordCard from '../../components/ForgotPasswordCard';
import CustomButton from '../../components/CustomButton';
import ErrorComponent from '../../components/ErrorComponent';
import Layout from '../../components/Layout';
import { sendPasswordResetEmail } from '../../apiconfig/firebaseapi';
import { useToast } from '../../context/ToastContext';

const ForgetPasswordScreen = () => {
  const {showToast} = useToast();
  const [email, setEmail] = useState<string>('lovishchugh01@gmail.com');
  const [error, setError] = useState<string>('');


  const handleFieldChange = (text: any) => {
    setError('');
    setEmail(text);
  };
  const handleReset = () => {
    console.log(email);
    if (!email) {
      setError('Please Enter email.');
      return;
    }

    sendPasswordResetEmail(email)
      .then(message => {
        showToast(message,'success');
        setEmail('')
      })
      .catch(error => {
        showToast(error.message,'error');
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
