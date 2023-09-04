import {View, StyleSheet, Platform} from 'react-native';
import React, { useState } from 'react';
import Mail from 'react-native-vector-icons/Ionicons';
import Label from './Label';
import {Textinput} from './Textinput';

interface ForgotPasswordCardProps {
    handleFieldChange: ( value: string) => void;
  }
  
const ForgotPasswordCard: React.FC<ForgotPasswordCardProps> = ({handleFieldChange}) => {
    const [email, setEmail] = useState<string>('lovishchugh01@gmail.com')
    const handleEmailChange = (text:string)=>{
        setEmail(text)
        handleFieldChange(text)
    }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Mail name="mail" size={26} color={'#EF5DA8'} />
        </View>
        <View style={{width:'90%', paddingVertical:10,}}>
          <Label title="via email:" selected={false} styles={styles.text} />
          <Textinput
            placeholder="Email"
            value={email}
            keyboardType='email-address'
            onChangeText={handleEmailChange}
            style={styles.textinput}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    elevation: 4, // Add elevation for Android shadow
    shadowColor: 'black', // Add shadow for iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 5,
    borderRadius: 15,
    marginHorizontal: 2,
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    width:'90%'
  },
  icon: {
    backgroundColor: '#FFEEF0',
    padding: 10,
    borderRadius: 20,
    marginRight:10
  },
  text: {
    color: '#999999',
  },
  textinput:{
    borderBottomColor:'lightgray',
    borderBottomWidth:1,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:Platform.OS === 'ios'? 5:0,
  }
});

export default ForgotPasswordCard;
