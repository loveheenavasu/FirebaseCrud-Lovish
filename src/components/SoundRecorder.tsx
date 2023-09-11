import React, {useState, FC, useCallback} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import Microphone from 'react-native-vector-icons/FontAwesome';
import Stop from 'react-native-vector-icons/Ionicons';

import { useAppDispatch } from '../services/redux/hooks';
import { handleAudioUpload, sendChatMessage } from '../services/redux/chatSlice';

const audioRecorderPlayer = new AudioRecorderPlayer();
interface soundRecorderProps {
  chatId: string;
  currentuserId: string;
  name: string;
}
const SoundRecorder: FC<soundRecorderProps> = ({
  chatId,
  currentuserId,
  name,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const dispatch = useAppDispatch();
  const [recordSecs, setrecordSecs] = useState(0);
  const [recordTime, setrecordTime] = useState('');

  const onStartRecord = useCallback(async () => {
    setIsRecording(true);

    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        console.log('write external stroage', grants);
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED ||
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED ||
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await audioRecorderPlayer.startRecorder(undefined, audioSet);
    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      // console.log('record-back', e);
      setrecordSecs(e.currentPosition);
      setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
    console.log('uri:', `${uri}`);
  }, []);
  // const onStopRecord = useCallback(async () => {
  //   const result = await audioRecorderPlayer.stopRecorder();
  //   audioRecorderPlayer.removeRecordBackListener();
  //   setrecordSecs(0);
  //   console.log(result);
  //   setIsRecording(false);
  //   if (result) {
  //     const audioDownloadURL = await handleAudioUpload(result);
  //     if (audioDownloadURL) {
  //       const resultAction = await dispatch(
  //         sendChatMessage({
  //           chatId,
  //           currentuserId,
  //           name,
  //           newMessage: '',
  //           image: '',
  //           documentUrl: '',
  //           audioUrl: audioDownloadURL,
  //         }),
  //       );
  //       if (sendChatMessage.fulfilled.match(resultAction)) {
  //         console.log('Audio send');
  //       }
  //     } else {
  //       console.error('Failed to upload audio to Firebase Storage.');
  //     }
  //   } else {
  //     console.error('No audio recorded.');
  //   }
  // }, []);
  const stopAudioRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setrecordSecs(0);
    setIsRecording(false);
    return result;
  };
  
  const onStopRecord = useCallback(async () => {
    try {
      const result = await stopAudioRecording();
      if (result) {
        const audioDownloadURL = await handleAudioUpload(result);
        if (audioDownloadURL) {
          await sendAudioMessage(audioDownloadURL);
        }
      } else {
        console.error('No audio recorded.');
      }
    } catch (error) {
      console.error('Error during audio recording:', error);
    }
  }, []);

  const sendAudioMessage = async (audioDownloadURL:string) => {
    const resultAction = await dispatch(
      sendChatMessage({
        chatId,
        currentuserId,
        name,
        newMessage: '',
        image: '',
        documentUrl: '',
        audioUrl: audioDownloadURL,
      })
    );
  
    if (sendChatMessage.fulfilled.match(resultAction)) {
      console.log('Audio sent');
    }
  };


  return (
    <>
      {isRecording ? (
        <TouchableOpacity onPress={onStopRecord}>
          <Stop style={styles.icon} name="stop" size={26} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onStartRecord}>
          <Microphone style={styles.icon} name="microphone" size={26} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 5,
        justifyContent:'center',
        alignItems:'center',
    },
})
export default SoundRecorder;
