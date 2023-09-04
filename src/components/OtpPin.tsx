import React, {useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'; // Make sure to import the correct package

interface OTPPinProps {
  onCodeChange: (code: string) => void;
}

const OtpPin: React.FC<OTPPinProps> = ({onCodeChange}) => {
  const [code, setCode] = useState('');
  const pinInput = useRef<any>(null);

  const checkCode = (enteredCode: string) => {
    setCode(enteredCode);
    onCodeChange(enteredCode);
    if(enteredCode.length ==6){
      setCode('')
    }
  };

  const handleTextChange = (text: string) => {
    // const numericText = text.replace(/[^0-9]/g, '');
    setCode(text);
  };

  return (
    <View style={styles.otpPin}>
      <SmoothPinCodeInput
        ref={pinInput}
        value={code}
        onTextChange={handleTextChange}
        onFulfill={checkCode}
        codeLength={6}
        cellStyle={styles.pin}
        textStyle={styles.text}
        autoFocus={true}
        restrictToNumbers={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  otpPin:{
    width:'90%',
    alignSelf:'center',
    marginVertical:20
  },
  pin:{
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ECEEF3',
  },
  text:{
    fontSize: 16,
    color: 'black'
  }
})
export default OtpPin;
