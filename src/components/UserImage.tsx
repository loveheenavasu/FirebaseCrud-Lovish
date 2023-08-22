// UserImage.tsx

import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import CameraIcon from 'react-native-vector-icons/EvilIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import CustomButton from './CustomButton';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions,
  MediaType,
} from 'react-native-image-picker';
interface UserImageProps {
  source: string | unknown;
  size: number;
  handleImageChange: (a: any) => void;
  update: boolean;
}

const UserImage: React.FC<UserImageProps> = ({
  source,
  size,
  handleImageChange,
  update,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleGalleryOption = () => {
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
        handleImageChange(selectedImage);
        setModalVisible(false);
      }
    });
    closeModal(); // Close the modal
  };

  const handleCameraIconPress = () => {
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
        handleImageChange(selectedImage);
        setModalVisible(false);
      }
    });
    closeModal();
  };

  const defaultProfileUrl =
    'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg';

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      {source ? (
        <Image source={{uri: source}} style={styles.image} resizeMode="cover" />
      ) : (
        <Image
          source={{
            uri: defaultProfileUrl,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      {update && (
        <CameraIcon
          name="camera"
          onPress={openModal}
          size={30}
          color="#4B164C"
          style={styles.cameraIcon}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CrossIcon
              size={26}
              onPress={closeModal}
              name="cross"
              color="#4B164C"
              style={styles.cross}
            />
            <CustomButton
              title="From Gallery"
              marginTop={10}
              onPress={handleGalleryOption} // Add your logic for gallery option
              backgroundColor="#4B164C"
              textColor="white"
            />
            <CustomButton
              title="From Camera"
              marginTop={10}
              onPress={handleCameraIconPress} // Handle camera icon press
              textColor="white"
              backgroundColor="#4B164C"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    backgroundColor: 'lightgray',
  },
  cross: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderWidth: 1,
  },
});

export default UserImage;
