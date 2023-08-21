import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Modal,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import CustomizedButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import {CustomTextInput} from '../../components/Textinput';
import Cross from 'react-native-vector-icons/Entypo';
import Camera from 'react-native-vector-icons/EvilIcons';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions,
  MediaType,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import styles from './styles';
import {validateEmail} from '../../util/validation';
import Label from '../../components/Label';

interface userProps {
  email: string;
  password: string;
  userImage: string | undefined;
}
type navigationProps = {
  Home: undefined;
};
export const RegisterScreen = () => {
  const [userData, setUserData] = useState<userProps>({
    email: '',
    password: '',
    userImage: undefined,
  });
  const {email, password, userImage} = userData;
  const [error, setError] = useState<any>(null);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleEmailChange = (text: string) => {
    setError(null);
    setUserData(prevData => ({
      ...prevData,
      email: text,
    }));
  };

  const handlePasswordChange = (text: string) => {
    setError(null);
    setUserData(prevData => ({
      ...prevData,
      password: text,
    }));
  };

  const openImagePicker = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        console.log(selectedImage);
        

        setUserData(prevData => ({
          ...prevData,
          userImage: selectedImage,
        }));
        setModalVisible(false);
        setError(null);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        console.log(selectedImage);

        setUserData(prevData => ({
          ...prevData,
          userImage: selectedImage,
        }));
        setModalVisible(false);
        setError(null);
      }
    });
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
    if (!userImage) {
      setError('Please select an image.');
      return;
    }

    try {
      setSpinner(true);

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      if (userImage) {
        const imageFileName = `profile_${user.uid}.jpg`; // You can customize the file name as needed
        const reference = storage().ref(`profileImages/${imageFileName}`);
        await reference.putFile(userImage);

        const imageUrl = await reference.getDownloadURL();

        const usersCollection = firestore().collection('users');
        await usersCollection.doc(user.uid).set({
          email: email,
          name: '',
          phone: '',
          profileImage: imageUrl, // Adding the profile image URL
          // Other user-related data can be added here
        });
      }

      // Display a success message
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'User created successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }

      navigation.navigate('Home');
      setUserData({
        email: '',
        password: '',
        userImage: undefined,
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        setError('That email address is invalid!');
      } else if (error.code === 'auth/user-not-found') {
        setError('That email address does not exist!');
      } else if (error.code === 'auth/weak-password') {
        setError('Please enter a password of minimum 6 digits.');
      }

      console.log(error.message);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Spinner visible={spinner} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Cross
              size={26}
              onPress={() => setModalVisible(!modalVisible)}
              name="cross"
              color="orange"
              style={styles.cross}
            />
            <CustomizedButton
              title="From gallery"
              marginTop={10}
              onPress={openImagePicker}
              backgroundColor="orange"
            />
            <CustomizedButton
              title="From Camera"
              marginTop={10}
              onPress={handleCameraLaunch}
              backgroundColor="orange"
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <BackIcon name="arrow-back" size={30} color="orange" />
        <Label styles={{color: 'orange', fontSize: 18}} title="Login" />
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Label styles={styles.orangeHeading} title="Register Screen" />
        <View style={styles.imageCapture}>
          {userImage ? (
            <Image
              source={{
                uri: userImage,
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 100,
                overflow: 'hidden',
              }}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg',
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 100,
                overflow: 'hidden', // Clip the image within the circular border
              }}
              resizeMode="cover"
            />
          )}
          <Camera
            size={40}
            onPress={() => setModalVisible(!modalVisible)}
            name="camera"
            color="orange"
            style={styles.camera}
          />
        </View>
        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        <CustomTextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={handlePasswordChange}
        />

        {error && <Label styles={styles.errorText} title={error} />}
        <CustomizedButton
          title="Register"
          onPress={handleRegister}
          marginTop={30}
          backgroundColor="orange"
        />
      </View>
    </KeyboardAvoidingView>
  );
};
