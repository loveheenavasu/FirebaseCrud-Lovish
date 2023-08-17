import { View, Text, StyleSheet, TextInput, ToastAndroid, Alert, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomizedButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; 


export const HomeScreen = () => {
  const [email, setEmail] = useState<string>(''); // Specify string type
  const [name, setName] = useState<string>(''); // Specify string type
  const [phone, setPhone] = useState<string>(''); // Specify string type
  const [update, setUpdate] = useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState<string>('lightgray');

  const navigation = useNavigation<any>();

  const handleSignout = () => {

    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.replace('Login')
  }
  useEffect(() => {
    // Fetch user data from Firestore
    const userId = auth().currentUser?.uid; // Get the current user's ID
    if (userId) {
      const userRef = firestore().collection('users').doc(userId);

      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if(userData){
            setEmail(userData.email);
            setName(userData.name);
            setPhone(userData.phone);
          }
        }
      });
    }
  }, []); 
  const handleUpdate = () => {
    if (!name) {
      Alert.alert('Please enter your name.');
      return;
    }
  
    if (!phone) {
      Alert.alert('Please enter your phone number.');
      return;
    }
    const userId = auth().currentUser?.uid;
    if (userId) {
      const userRef = firestore().collection('users').doc(userId);
      userRef.update({
        name: name,
        phone: phone,
      }).then(() => {
        setUpdate(false)
        if(Platform.OS === 'android'){

          ToastAndroid.showWithGravityAndOffset(
            'User data updated successfully',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
        console.log('User data updated successfully');
      }).catch((error) => {
        console.error('Error updating user data:', error);
      });
    }
  }
  useEffect(() => {
    if (phone.length < 10 || !name) {
      setButtonColor('lightgray');
    } else {
      setButtonColor('orange');
    }
  }, [phone, name]);

  const handleEdit = () =>{
    setUpdate(true);
  }



  const handlePhoneChange = (text: string) => {
    setPhone(text);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };



  return (
    <View style={styles.container}>

      <View style={styles.wrapper}>
        <Text style={styles.orangeHeading}>Welcome</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Email"
          value={email}
          keyboardType='email-address'
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Name"
          value={name}
          keyboardType='email-address'
          onChangeText={handleNameChange}
          editable={update}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Phone Number"
          value={phone}
          keyboardType='number-pad'
          onChangeText={handlePhoneChange}
          editable={update}
        />

        {
          update ? 
          <CustomizedButton title="Update" onPress={handleUpdate} backgroundColor={buttonColor} />
          :
          <CustomizedButton title="Edit" onPress={handleEdit} backgroundColor='orange'/>
        }

        <CustomizedButton title="Signout" onPress={handleSignout} backgroundColor='orange' />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 35,

  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },
  orangeHeading: {
    color: 'orange',
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 50
  },
  inputContainer: {
    width: '80%',
    flex: 1

  },
  input: {
    height: 40,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white'
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center'
  }
})
