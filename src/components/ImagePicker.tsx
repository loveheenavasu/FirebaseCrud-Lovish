import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import CrossIcon from 'react-native-vector-icons/Entypo';
import CustomButton from './CustomButton';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions,
  MediaType,
} from 'react-native-image-picker';

interface ImagePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelectImage: (imageUri: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  visible,
  onClose,
  onSelectImage,
}) => {
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
        if (onSelectImage) {
          onSelectImage(selectedImage||'');
        }
        if (onClose) {
          onClose();
        }
      }
    });
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
        if (onSelectImage) {
          onSelectImage(selectedImage||'');
        }
        if (onClose) {
          onClose();
        }
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CrossIcon
            size={26}
            onPress={onClose}
            name="cross"
            color="#4B164C"
            style={styles.cross}
          />
          <CustomButton
            title="From Gallery"
            marginTop={10}
            onPress={handleGalleryOption}
            backgroundColor="#4B164C"
            textColor="white"
          />
          <CustomButton
            title="From Camera"
            marginTop={10}
            onPress={handleCameraIconPress}
            textColor="white"
            backgroundColor="#4B164C"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default ImagePicker;