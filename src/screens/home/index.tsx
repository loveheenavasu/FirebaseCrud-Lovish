import {
  View,
  ToastAndroid,
  Alert,
  Platform,
  Image,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomizedButton from '../../components/CustomButton';
import {CommonActions, NavigationProp, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import Label from '../../components/Label';

interface userProps {
  email: string;
  phone:string;
  name:string;
  userImage:string | undefined;
}
type navigationProps = {
  Login: undefined;
};
export const HomeScreen = () => {
  const [userData, setUserData] = useState<userProps>({
    email: '',
    name:'',
    phone:'',
    userImage: undefined
  });
  const {email,name,phone,userImage} = userData;
  const [update, setUpdate] = useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState<string>('lightgray');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleSignout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Login' },
        ],
      })
    );
  };
  useEffect(() => {
    // Fetch user data from Firestore
    const userId = auth().currentUser?.uid; // Get the current user's ID
    if (userId) {
      const userRef = firestore().collection('users').doc(userId);

      userRef.get().then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          console.log(userData);
          if (userData) {
            setUserData({
              email: userData.email,
              name: userData.name,
              phone: userData.phone,
              userImage: userData.profileImage
            });
          }
        }
      });
    }
  }, []);
  const handleUpdate = async () => {
    if (!name) {
      Alert.alert('Please enter your name.');
      return;
    }

    if (!phone) {
      Alert.alert('Please enter your phone number.');
      return;
    }
    if (userImage !== undefined) {
      await handleUpdateImage();
    }
    const userId = auth().currentUser?.uid;
    if (userId) {
      const userRef = firestore().collection('users').doc(userId);
      userRef
        .update({
          name: name,
          phone: phone,
        })
        .then(() => {
          setUpdate(false);
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset(
              'User data updated successfully',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
          console.log('User data updated successfully');
          setSpinner(false);
        })
        .catch(error => {
          console.error('Error updating user data:', error);
          setSpinner(false);
        });
    }
  };
  useEffect(() => {
    if (phone.length < 10 || !name) {
      setButtonColor('lightgray');
    } else {
      setButtonColor('orange');
    }
  }, [phone, name]);

  const openImagePicker = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality:0.5
    };
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setUserData(prevData => ({
          ...prevData,
          userImage: selectedImage,
        }));
        setModalVisible(false);
      }
    });
  };

  const handleUpdateImage = async () => {
    const userId = auth().currentUser?.uid;
    if (userId && userImage) {
      console.log(userImage);
      
      try {
        setSpinner(true);
  
        // Update Firestore collection
        await firestore().collection('users').doc(userId).update({
          profileImage: userImage,
        });
  
        // Upload new image to Firebase Storage
        const imageName = `profileImages/profile_${userId}.jpg`;
        const storageRef = storage().ref().child(imageName);
  
        // Convert local image URI to blob directly
        const blob = await new Promise<Blob>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => resolve(xhr.response as Blob);
          xhr.onerror = () => reject(new TypeError('Network request failed'));
          xhr.responseType = 'blob';
          xhr.open('GET', userImage, true); // Use userImage directly
          xhr.send(null);
        });
  
        await storageRef.put(blob);
  
        console.log('Profile image updated successfully');
        setSpinner(false);
      } catch (error) {
        console.error('Error updating profile image:', error);
        setSpinner(false);
      }
    }
  };
  
  
  

  const handleCameraLaunch = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality:0.5
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setUserData(prevData => ({
          ...prevData,
          userImage: selectedImage,
        }));
        setModalVisible(false);
        // console.log(response.assets[0].uri);
      }
    });
  };

  const handleEdit = () => {
    setUpdate(true);
  };

  const handlePhoneChange = (text: string) => {
    setUserData(prevData => ({
      ...prevData,
      phone: text,
    }));
  };

  const handleNameChange = (text: string) => {
    setUserData(prevData => ({
      ...prevData,
      name: text,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
        <View style={styles.wrapper}>
          <Label styles={styles.orangeHeading} title='Welcome'/>
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
            {update && (
              <Camera
                size={40}
                onPress={() => setModalVisible(!modalVisible)}
                name="camera"
                color="orange"
                style={styles.camera}
              />
            )}
          </View>
          <CustomTextInput
            placeholder="Email"
            value={email}
            editable={false}
            onChangeText={() => {}}
          />
          <CustomTextInput
            placeholder="Name"
            value={name}
            onChangeText={handleNameChange}
            editable={update}
          />
          <CustomTextInput
            placeholder="Phone Number"
            value={phone}
            keyboardType="number-pad"
            onChangeText={handlePhoneChange}
            editable={update}
          />

          {update ? (
            <CustomizedButton
              title="Update"
              onPress={handleUpdate}
              marginTop={30}
              backgroundColor={buttonColor}
            />
          ) : (
            <CustomizedButton
              title="Edit"
              onPress={handleEdit}
              marginTop={30}
              backgroundColor="orange"
            />
          )}
          <CustomizedButton
            title="Signout"
            onPress={handleSignout}
            marginTop={30}
            backgroundColor="orange"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
