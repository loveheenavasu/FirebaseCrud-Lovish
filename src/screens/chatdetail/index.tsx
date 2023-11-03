import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  FlatList,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import ChatHeader from '../../components/ChatHeader';
import {Textinput} from '../../components/Textinput';
import Send from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-vector-icons/Feather';
import {scale} from '../../util/screenSize';
import MessageCard from '../../components/MessageCard';
import ImagePicker from '../../components/ImagePicker';
const {height} = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';
import SoundRecorder from '../../components/SoundRecorder';
import DocPicker from '../../components/DocumentPicker';
import {useAppDispatch} from '../../services/redux/hooks';
import {loadMessages, sendChatMessage} from '../../services/redux/chatSlice';

interface Message {
  sender: string;
  text: string;
  name: string;
  timestamp: any;
  imageUrl?: string | any;
  documentUrl?: string | any;
  audioUrl?: string | any;
}
const ChatDetailScreen = ({route}: any) => {
  const {name, image, currentuserId, otheruserId} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const chatId =
    currentuserId < otheruserId
      ? `${currentuserId}_${otheruserId}`
      : `${otheruserId}_${currentuserId}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const limit = 10;
  const dispatch = useAppDispatch(); // Get the dispatch function from Redux

  const sendMessage = async () => {
    try {
      const resultAction = await dispatch(
        sendChatMessage({
          chatId,
          currentuserId,
          name,
          newMessage,
          image: '', // Add the relevant image, document, and audio URLs here
          documentUrl: '',
          audioUrl: '',
        })
      );
  
      if (sendChatMessage.fulfilled.match(resultAction)) {
        setNewMessage('');
        Keyboard.dismiss();
      } else {
        console.log('message nhi gya');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const loadMoreMessages = () => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      dispatch(loadMessages({chatId, limit, startAfter: lastMessage.timestamp}))
        .unwrap()
        .then(moreMessages => {
          if (moreMessages.length > 0) {
            setMessages(prevMessages => [...prevMessages, ...moreMessages]);
          }
        })
        .catch(error => {
          console.error('Error loading more messages:', error);
        });
    }
  };
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .onSnapshot(querySnapshot => {
        const newRealTimeMessages: Message[] = [];
        querySnapshot.forEach(doc => {
          const messageData = doc.data() as Message;
          newRealTimeMessages.push(messageData);
        });

        newRealTimeMessages.sort((a, b) => b.timestamp - a.timestamp);
        setMessages(newRealTimeMessages);
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [chatId]);

  return (
    <View style={styles.container}>
      <ChatHeader title={name} image={image} activeColor="#2BEF83" />
      <KeyboardAvoidingView
        keyboardVerticalOffset={
          Platform.OS === 'ios' && height > 700 ? scale(60) : 20
        }
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{justifyContent: 'flex-end', flex: 1}}>
        <FlatList
          data={messages}
          keyExtractor={(message, index) => index.toString()}
          renderItem={({item}) => {
            // console.log(item);
            return (
              <MessageCard
                sender={item.sender}
                name={item.name}
                text={item.text}
                timestamp={item.timestamp}
                imageUrl={item.imageUrl}
                documentUrl={item.documentUrl}
                audioUrl={item.audioUrl}
              />
            );
          }}
          onEndReached={loadMoreMessages}
          onEndReachedThreshold={0.1}
          inverted={true}
        />
        <ImagePicker
          visible={modalVisible}
          onClose={closeModal}
          chatId={chatId}
          currentuserId={currentuserId}
          name={name}
          onSelectImage={() => {}}
        />

        <View style={styles.wrapper}>
          <DocPicker
            chatId={chatId}
            currentuserId={currentuserId}
            name={name}
          />
          <View style={styles.textinput}>
            <Textinput
              placeholder="Message"
              label={false}
              value={newMessage}
              onChangeText={text => setNewMessage(text)}
              keyboardType="default"
            />
          </View>
          {newMessage === '' ? (
            <>
              <SoundRecorder
                chatId={chatId}
                currentuserId={currentuserId}
                name={name}
              />
              <Camera
                style={styles.icon}
                name="camera"
                size={26}
                onPress={openModal}
              />
            </>
          ) : (
            <Send
              onPress={sendMessage}
              style={styles.icon}
              name="send-sharp"
              size={26}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatDetailScreen;
