import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from './store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';

const initialState = {
  user: null,
  loading: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Fetch other users
interface fetchOtherUserData {
  uid: string;
  name: string;
  time: string;
  profileImage: string;
  location: string;
  dob: string;
  gender: string;
  bio: string;
}

export const fetchOtherUsers = createAsyncThunk(
  'chat/fetchOtherUsers',
  async ({currentUserId}: {currentUserId: string}, {dispatch}) => {
    const usersRef = firestore().collection('users');
    try {
      dispatch(setLoading(true));
      const querySnapshot = await usersRef.get();
      const usersData: fetchOtherUserData[] = querySnapshot.docs
        .map(doc => ({uid: doc.id, ...doc.data()} as fetchOtherUserData))
        .filter(user => user.uid !== currentUserId);
      dispatch(setLoading(true));
      return usersData;
    } catch (error: any) {
      dispatch(setLoading(true));
      throw error.message;
    }
  },
);

// Send chat message
export const sendChatMessage = createAsyncThunk(
  'chat/sendChatMessage',
  async ({
    chatId,
    currentuserId,
    name,
    newMessage,
    image,
    documentUrl,
    audioUrl,
  }: {
    chatId: string;
    currentuserId: string | null;
    name: string;
    newMessage: string;
    image: string;
    documentUrl: string;
    audioUrl: string;
  }) => {
    if (
      newMessage.trim() === '' &&
      image.length === 0 &&
      documentUrl.length === 0 &&
      audioUrl.length === 0
    ) {
      return;
    }

    const chatRef = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages');

    try {
      await chatRef.add({
        sender: currentuserId,
        name: name,
        text: newMessage,
        imageUrl: image,
        timestamp: firestore.FieldValue.serverTimestamp(),
        documentUrl: documentUrl,
        audioUrl: audioUrl,
      });

      return 'Message sent successfully.';
    } catch (error: any) {
      throw error.message;
    }
  },
);

// Load messages
interface Message {
  sender: string;
  text: string;
  name: string;
  videoUrl: string;
  imageUrl: string;
  documentUrl: string;
  timestamp: any;
}
export const loadMessages = createAsyncThunk(
  'chat/loadMessages',
  async ({
    chatId,
    limit,
    startAfter,
  }: {
    chatId: string;
    limit: number;
    startAfter?: any;
  }) => {
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

    return messagesData;
  },
);

export const handleMediaUpload = async (imageUrl: string | undefined) => {
  if (imageUrl) {
    try {
      const imageName = `messages/${Date.now()}.jpg`;
      const storageRef = storage().ref().child(imageName);

      const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response as Blob);
        xhr.onerror = () => reject(new TypeError('Network request failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', imageUrl, true);
        xhr.send(null);
      });

      await storageRef.put(blob);
      console.log('Image uploaded successfully');

      // Get the download URL if needed
      const downloadUrl = await storageRef.getDownloadURL();
      return downloadUrl;
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  }
};
export const handleAudioUpload = async (imageUrl: string | undefined) => {
  const type = Platform.OS === 'ios' ? 'm4a' : 'mp3';
  if (imageUrl) {
    try {
      const imageName = `audio/${Date.now()}.${type}`;
      const storageRef = storage().ref().child(imageName);

      const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response as Blob);
        xhr.onerror = () => reject(new TypeError('Network request failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', imageUrl, true);
        xhr.send(null);
      });

      await storageRef.put(blob);
      console.log('Audio uploaded successfully');

      // Get the download URL if needed
      const downloadUrl = await storageRef.getDownloadURL();
      return downloadUrl;
    } catch (error) {
      console.log('Error uploading audio:', error);
    }
  }
};
export const handleDocsUpload = async (documentUrl: string | undefined) => {
  if (documentUrl) {
    try {
      const documentName = `document/${Date.now()}.pdf`;
      const storageRef = storage().ref().child(documentName);

      const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response as Blob);
        xhr.onerror = () => reject(new TypeError('Network request failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', documentUrl, true);
        xhr.send(null);
      });

      await storageRef.put(blob);
      console.log('Document uploaded successfully');

      // Get the download URL if needed
      const downloadUrl = await storageRef.getDownloadURL();
      return downloadUrl;
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  }
};

export const {setUser, setLoading} = chatSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;

export default chatSlice.reducer;
