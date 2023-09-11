import React, { useEffect, useState,FC } from 'react';
import {View, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {Header} from '../../components/ImageHeader';
import ChatCard from '../../components/ChatCard';
import { useAppDispatch } from '../../services/redux/hooks';
import { fetchOtherUsers } from '../../services/redux/chatSlice';

interface UserData {
  uid: string;
  name: string;
  time: string;
  profileImage: string;
}

const ChatScreen: FC = () => {
  const [currentUser, setCurrentUser] = useState<string>('');
  const [otherUsers, setOtherUsers] = useState<UserData[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setCurrentUser(user.uid);
      fetchUsers(user.uid);
    }
  }, []);

  const fetchUsers = (currentUserId: string) => {
    dispatch(fetchOtherUsers({currentUserId}))
      .unwrap()
      .then(usersData => {
        setOtherUsers(usersData);
      })
      .catch(error => {
        console.error('Error fetching other users:', error);
      });
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
