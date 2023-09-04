import {FlatList, View} from 'react-native';
import React from 'react';
import styles from './styles';
import NotificationCard from '../../components/NotificationCard';
import BackHeader from '../../components/BackHeader';

const data = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    name: 'Emmy Rose',
    age: 30,
    time: '1 day ago',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
    name: 'Ash Smith',
    age: 25,
    time: '1 week ago',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1519764622345-23439dd774f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
    name: 'Michael Johnson',
    age: 40,
    time: '2 week ago',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1611637576109-b6f76185ec9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
    name: 'jax Brown',
    age: 28,
    time: 'a month ago',
  },
];

const NotificationsScreen = () => {
  const renderItem = ({item}: any) => {
    return (
      <NotificationCard
        name={item.name}
        age={item.age}
        time={item.time}
        image={item.image}
      />
    );
  };

  return (
    <View style={styles.contianer}>
      <BackHeader title="Notifications" />
      <View style={styles.wrapper}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default NotificationsScreen;
