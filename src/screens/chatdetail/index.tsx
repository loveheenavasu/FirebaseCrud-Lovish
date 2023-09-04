import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import ChatHeader from '../../components/ChatHeader';
import {Textinput} from '../../components/Textinput';
import Attachment from 'react-native-vector-icons/Entypo';
import Send from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-vector-icons/Feather';
import Microphone from 'react-native-vector-icons/FontAwesome';
import {scale} from '../../util/screenSize';
import MessageCard from '../../components/MessageCard';
import {
  getChatMessages,
  handleMediaUpload,
  sendChatMessage,
} from '../../apiconfig/firebaseapi';
import ImagePicker from '../../components/ImagePicker';
const {height} = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';

interface Message {
  sender: string;
  text: string;
  name: string;
  timestamp: any;
  imageUrl?: string | any;
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

  // useEffect(() => {
  //   const unsubscribe = getChatMessages(chatId, setMessages);
  //   return () => unsubscribe();
  // }, [chatId]);

  const sendMessage = async () => {
    sendChatMessage(chatId, currentuserId, name, newMessage, '');
    setNewMessage('');
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const limit = 10;

  const handleImageChange = async (selectedImageUri: string) => {
    console.log('fdsfsd');

    try {
      const imageUrl = await handleMediaUpload(selectedImageUri);
      if (imageUrl !== undefined) {
        sendChatMessage(chatId, currentuserId, name, '', imageUrl);
      } else {
        console.log('Image upload failed.');
      }
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };
  useEffect(() => {
    const loadInitialMessages = async () => {
      const initialMessages = await loadMessages(limit);
      setMessages(initialMessages);
    };

    loadInitialMessages();
  }, [chatId]);

  const loadMoreMessages = async () => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const moreMessages = await loadMessages(limit, lastMessage.timestamp);

      if (moreMessages.length > 0) {
        setMessages(prevMessages => [...prevMessages, ...moreMessages]);
      }
    }
  };

  const loadMessages = async (limit: number, startAfter?: any) => {
    const messagesRef = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages');

    let query = messagesRef.orderBy('timestamp', 'desc').limit(limit);

    if (startAfter) {
      query = query.startAfter(startAfter);
    }

    const querySnapshot = await query.get();
    const messagesData: Message[] = [];
    querySnapshot.forEach(doc => {
      const messageData = doc.data() as Message;
      messagesData.push(messageData);
    });

    return messagesData; // Remove the reverse() to maintain the order
  };

  return (
    <View style={styles.container}>
      <ChatHeader title={name} image={image} activeColor="#2BEF83" />
      <KeyboardAvoidingView
        keyboardVerticalOffset={
          Platform.OS === 'ios' && height > 700 ? scale(10) : 20
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
              />
            );
          }}
          onEndReached={loadMoreMessages}
          onEndReachedThreshold={0.1}
        />
        <ImagePicker
          visible={modalVisible}
          onClose={closeModal}
          onSelectImage={imageUri => handleImageChange(imageUri)}
        />

        <View style={styles.wrapper}>
          <Attachment name="attachment" size={26} />
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
              <Camera
                style={styles.icon}
                name="camera"
                size={26}
                onPress={openModal}
              />
              <Microphone style={styles.icon} name="microphone" size={26} />
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
