import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import CameraIcon from 'react-native-vector-icons/EvilIcons';
import ImagePicker from './ImagePicker';
interface UserImageProps {
  source: string | undefined;
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
      {/* <ImagePicker
        visible={modalVisible}
        onClose={closeModal}
        onSelectImage={handleImageChange}
      /> */}
      <ImagePicker
          visible={modalVisible}
          onClose={closeModal}
          onSelectImage={handleImageChange}
          chatId={''} currentuserId={''} name={'true'}
        />
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
});

export default UserImage;
