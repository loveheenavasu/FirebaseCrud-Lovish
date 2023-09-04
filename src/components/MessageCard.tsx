import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { scale } from '../util/screenSize';
import { formatFirestoreTimestamp } from '../util/TimeFormat';
import ImageModal from './ImageModal';

interface MessageProps {
  sender: string;
  text: string;
  name: string;
  timestamp: any;
  imageUrl: string;
}

const MessageCard: FC<MessageProps> = ({
  sender,
  text,
  name,
  timestamp,
  imageUrl,
}) => {
  const userId = auth().currentUser?.uid;
  const isCurrentUser = sender === userId;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedTimeString = timestamp
    ? formatFirestoreTimestamp(timestamp)
    : '';
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <>
      <View
        style={[
          styles.common,
          isCurrentUser ? styles.pink : styles.gray,
          isCurrentUser ? styles.flexEnd : styles.flexStart,
          imageUrl ? styles.mediaContainer : null,
        ]}>
        {text === '' && (imageUrl) ? (
          <TouchableOpacity onPress={()=>openModal()}>
            {imageUrl ? (
              <Image
                source={{
                  uri: imageUrl,
                }}
                style={[
                  styles.media,
                  { width: scale(130), height: scale(90) },
                ]}
              />
            ) : null}
            
          </TouchableOpacity>
        ) : (
          <Text
            style={[
              styles.text,
              isCurrentUser ? styles.whiteText : styles.blackText,
            ]}
          >
            {text}
          </Text>
        )}
      </View>
      <Text
        style={[
          styles.common,
          styles.timeText,
          isCurrentUser ? styles.flexEnd : styles.flexStart,
        ]}
      >
        {formattedTimeString}
      </Text>
      {isModalOpen && <ImageModal imageUrl={imageUrl} closeModal={closeModal} isModalOpen={isModalOpen} />}

    </>
  );
};

const styles = StyleSheet.create({
  common: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pink: {
    width: scale(141),
    backgroundColor: '#FF3099',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: scale(5),
    padding:scale(8)
  },
  text: {
    fontSize: scale(16),
    color: 'white',
  },
  media: {
    borderRadius: 10,
  },
  mediaContainer: {
    height: scale(100),
    paddingVertical: 20,
  },
  timeText: {
    color: '#797C7B',
    marginRight: 20,
  },
  gray: {
    backgroundColor: 'lightgray',
    color: 'black',
    width: scale(141),
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: scale(5),
    padding:8
  },
  flexEnd: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  flexStart: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  blackText: {
    color: 'black',
  },
  whiteText: {
    color: 'white',
  },
});

export default MessageCard;
