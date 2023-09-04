import {View, ScrollView, Alert} from 'react-native';
import React from 'react';
import styles from './styles';
import Label from '../../components/Label';
import OtpPin from '../../components/OtpPin';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { navigationProps } from '../../components/type';
import Layout from '../../components/Layout';

const OtpScreen = ({route}: any) => {
  const {email} = route.params;
  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleOTPChange = (enteredOTP: any) => {
    console.log(enteredOTP);
    if(enteredOTP.length ==6){
        verifyOTP(enteredOTP);
    }
  };
  
  const verifyOTP = (otpValue:any) => {
    console.log('otpvalue',otpValue);
    if (otpValue == '123456') {
      navigation.navigate('ChangePassword');
    } else {
      Alert.alert('Incorrect OTP. Please enter the correct OTP.');
    }
  };

  return (
    <Layout title='Verify Code' header={true}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.wrapper}>
          <Label
            title={`A code has been sent to ${email} via mail`}
            selected={false}
            styles={styles.greytext}
          />
          <OtpPin onCodeChange={handleOTPChange} />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default OtpScreen;
