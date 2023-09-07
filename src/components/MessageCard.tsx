import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {scale} from '../util/screenSize';
import {formatFirestoreTimestamp} from '../util/TimeFormat';
import ImageModal from './ImageModal';
import Docs from 'react-native-vector-icons/Foundation';
import Play from 'react-native-vector-icons/Entypo';
import Pause from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface MessageProps {
  sender: string;
  text: string;
  name: string;
  timestamp: any;
  imageUrl: string;
  documentUrl: string;
  audioUrl: string;
}

const MessageCard: FC<MessageProps> = ({
  sender,
  text,
  name,
  timestamp,
  imageUrl,
  documentUrl,
  audioUrl,
}) => {
  const userId = auth().currentUser?.uid;
  const isCurrentUser = sender === userId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState<Boolean>(false);
  const [audioLocalPath, setAudioLocalPath] = useState<string | undefined>(
    undefined,
  );
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const formattedTimeString = timestamp
    ? formatFirestoreTimestamp(timestamp)
    : '';
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openDocument = (url: string) => {
    Linking.openURL(url);
  };

  const playSound = async (audioUrl: any) => {
    try {
      if (audioUrl) {
        const msg = await audioRecorderPlayer.startPlayer(audioUrl);
        audioRecorderPlayer.addPlayBackListener(e => {
          // console.log(e);
          if (e.currentPosition === e.duration) {
            stopSound();
          }
        });
        console.log('Play started:', msg);
        setAudioPlayed(true);
      } else {
        console.error('No audio URL provided.');
      }
    } catch (error) {
      console.error('Error starting audio playback:', error);
    }
  };

  const stopSound = async () => {
    setAudioPlayed(false);
    // console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  useEffect(() => {
    let type = Platform.OS === 'ios' ? 'm4a' : 'mp3';
    if (audioUrl && !audioLocalPath) {
      const localPath = `${RNFS.DocumentDirectoryPath}/audio_${timestamp}.${type}`;
      RNFS.downloadFile({
        fromUrl: audioUrl,
        toFile: localPath,
      })
        .promise.then(response => {
          if (response.statusCode === 200) {
            setAudioLocalPath(localPath);
          } else {
            console.error('Failed to download audio:', response.statusCode);
          }
        })
        .catch(error => {
          console.error('Error downloading audio:', error);
        });
    }
  }, [audioUrl, audioLocalPath, timestamp]);

  let url = Platform.OS === 'android' ? audioLocalPath : audioUrl;

  return (
    <>
      <Text
        style={[
          styles.common,
          styles.timeText,
          isCurrentUser ? styles.flexEnd : styles.flexStart,
        ]}>
        {formattedTimeString}
      </Text>
      <View
        style={[
          styles.common,
          isCurrentUser ? styles.pink : styles.gray,
          isCurrentUser ? styles.flexEnd : styles.flexStart,
          imageUrl ? styles.mediaContainer : null,
        ]}>
        {audioUrl !== '' && (
          <View style={styles.card}>
            <View style={[styles.play, {backgroundColor: '#FF3099'}]}>
              {audioPlayed ? (
                <Pause
                  onPress={stopSound}
                  name="pause"
                  size={26}
                  color="white"
                  style={styles.icon}
                />
              ) : (
                <Play
                  onPress={() => playSound(url)}
                  name="controller-play"
                  size={26}
                  color="white"
                  style={styles.icon}
                />
              )}
            </View>
            {audioLocalPath && (
              <Text style={{color: 'black'}}>Audio</Text>
            )}
          </View>
        )}
        {documentUrl !== '' && (
          <TouchableOpacity onPress={() => openDocument(documentUrl)}>
            <View style={styles.card}>
              <View
                style={[styles.iconContainer, {backgroundColor: '#FF3099'}]}>
                <Docs
                  name="page-doc"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
              </View>
              <Text style={styles.fileName}>Document</Text>
            </View>
          </TouchableOpacity>
        )}
        {text !== '' && (
          <Text
            style={[
              styles.text,
              isCurrentUser ? styles.whiteText : styles.blackText,
            ]}>
            {text}
          </Text>
        )}
        {imageUrl !== '' && (
          <TouchableOpacity onPress={() => openModal()}>
            {imageUrl ? (
              <Image
                source={{
                  uri: imageUrl,
                }}
                style={[styles.media, {width: scale(130), height: scale(90)}]}
              />
            ) : null}
          </TouchableOpacity>
        )}
      </View>

      {isModalOpen && (
        <ImageModal
          imageUrl={imageUrl}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
        />
      )}
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
    padding: scale(8),
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
    padding: 8,
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', // Background color of the card
    padding: scale(5),
    width: scale(120),
  },
  iconContainer: {
    backgroundColor: '#FF3099', // Pink background
    borderRadius: 10,
    padding: scale(5),
    marginRight: scale(10),
  },
  play: {
    backgroundColor: '#FF3099', // Pink background
    borderRadius: scale(30),
    padding: scale(5),
    marginRight: scale(10),
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileName: {
    color: 'black',
  },
});

export default MessageCard;
