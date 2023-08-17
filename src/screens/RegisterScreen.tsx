import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Platform } from 'react-native'
import React, { useState } from 'react'
import CustomizedButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';



export const RegisterScreen = () => {
  const [email, setEmail] = useState<string>(''); // Specify string type
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<any>(null)
  const [spinner, setSpinner] = useState<boolean>(false)

  const navigation = useNavigation<any>();

  const handleEmailChange = (text: string) => {
    setError(null)
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setError(null)
    setPassword(text);
  };
  const createUserDocument = async (userId: string, email: string) => {
    try {
      // Reference to the Firestore collection
      setSpinner(true)
      const usersCollection = firestore().collection('users');
  
      // Create a new document with the user's ID as the document ID
      await usersCollection.doc(userId).set({
        email: email,
        name:'',
        phone:''
        // Other user-related data can be added here
      });
      setSpinner(false)
      if(Platform.OS === 'android'){
        ToastAndroid.showWithGravityAndOffset(
          'User created successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );

      }

      navigation.navigate('Home')
  
      console.log('User document created successfully');
    } catch (error) {
      setSpinner(false)

      console.error('Error creating user document:', error);
    }
  };
  const validateEmail = (email:string) => {
    // Regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  };
  
  const handleRegister = async () => {
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
    try {
      setSpinner(true)
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // User successfully signed up, proceed to create user document in the collection
      const user = userCredential.user;
      createUserDocument(user.uid, email);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        setError('That email address is invalid!');
      }
      if (error.code === 'auth/user-not-found') {
        setError('That email address does not exist!');
      }
      if (error.code === 'auth/weak-password') {
        setError('Please Enter password of minimum 6 digits.');
      }
      setSpinner(false)
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Spinner
          visible={spinner}
        />
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
        <BackIcon name='arrow-back' size={30} color='orange' />
        <Text style={{ color: 'orange', fontSize: 18 }}>Login</Text>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Text style={styles.orangeHeading}>Register Screen</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <CustomizedButton title="Register" onPress={handleRegister} backgroundColor='orange' />
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
