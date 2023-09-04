import React, { useEffect, useState,FC } from 'react';
import {View, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import {Header} from '../../components/ImageHeader';
import ChatCard from '../../components/ChatCard';


interface UserData {
  uid: string;
  name: string;
  time: string;
  image: string;
}


const ChatScreen: FC = () => {
  const [currentUser, setCurrentUser] = useState<string>('');
  const [otherUsers, setOtherUsers] = useState<UserData[]>([]);

  useEffect(() => {
    // Fetch current user's UID using Firebase Authentication
    const user = auth().currentUser;
    if (user) {
      setCurrentUser(user.uid);
      fetchOtherUsers(user.uid);
    }
  }, []);

  const fetchOtherUsers = async (currentUserId: string) => {
    const usersRef = firestore().collection('users');

    try {
      const querySnapshot = await usersRef.get();
      const usersData: UserData[] = querySnapshot.docs
        .map(doc => ({ uid: doc.id, ...doc.data() } as UserData))
        .filter(user => user.uid !== currentUserId);

      setOtherUsers(usersData);
    } catch (error) {
      console.error('Error fetching other users:', error);
    }
  };

  const renderItem = ({item}: any) => {
    // console.log(item);
    
    return (
      <ChatCard
        name={item.name}
        image={item.profileImage}
        bio={item.bio}
        currentuserId={currentUser}
        otheruserId = {item.uid}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header marginTop={5} marginBottom={10} />
      <View>
        <FlatList
          data={otherUsers}
          renderItem={renderItem}
          keyExtractor={item => item.uid.toString()}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
