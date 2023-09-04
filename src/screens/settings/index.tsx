import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserImage from '../../components/UserImage';
import {fetchUserData, signOutUser} from '../../apiconfig/firebaseapi';
import Label from '../../components/Label';
import styles from './styles';
import ItemCard from '../../components/ItemCard';
import {CommonActions, NavigationProp, useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../components/type';
import CustomButton from '../../components/CustomButton';
import Spinner from 'react-native-loading-spinner-overlay';
const DATA = [
  {id: 0, name: 'Edit Profile'},
  {id: 1, name: 'Change Interests'},
  {id: 2, name: 'Search criteria'},
  {id: 3, name: 'Go Upgrade Vip'},
  {id: 4, name: 'Change Password'},
];
interface userProps {
  name: string;
  userImage: string | undefined;
}
const SettingScreen = () => {
  const [userData, setUserData] = useState<userProps>({
    name: '',
    userImage: undefined,
  });
  const {name, userImage} = userData;
  const [spinner, setSpinner] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleSignout = () => {
    signOutUser()
      .then(() => {
        console.log('User signed out!');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Login' }],
          }),
        );
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  useEffect(() => {
    setSpinner(true);
    fetchUserData()
      .then(userData => {
        if (userData) {
          setUserData({
            name: userData.name || '',
            userImage: userData.profileImage || undefined,
          });
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setSpinner(false);
      });
  }, []);

  const renderListItem = ({item}: {item: {id: number; name: string}}) => {
    return <ItemCard name={item.name} />;
  };
  return (
    <View style={styles.container}>
      <Spinner visible={spinner} />

      <View style={styles.wrapper}>
        <UserImage
          source={userImage}
          size={100}
          update={false}
          handleImageChange={() => {}}
        />
        <Label styles={styles.voiletHeading} selected={false} title={name} />
        <FlatList
          data={DATA}
          keyExtractor={item => item.id.toString()}
          renderItem={renderListItem}
        />
        <CustomButton
          title="Signout"
          onPress={handleSignout}
          marginTop={20}
          backgroundColor="#4B164C"
          textColor="white"
        />
      </View>
    </View>
  );
};

export default SettingScreen;
