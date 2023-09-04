import React, {FC} from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface imageModalProps {
    imageUrl:string;
    closeModal: () => void;
    isModalOpen: boolean;
}
const ImageModal: FC<imageModalProps> = ({ imageUrl, closeModal }) => {
  return (
    <Modal visible={!!imageUrl} transparent={true}>
      <View style={styles.modalContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.modalImage}
        />
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ImageModal;
