import {View, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import UserImage from '../../components/UserImage';
import Label from '../../components/Label';
import styles from './styles';
import ItemCard from '../../components/ItemCard';
import CustomButton from '../../components/CustomButton';
import {useAppDispatch, useAppSelector} from '../../services/redux/hooks';
import {
  selectLoading,
  setLoading,
  signOutUser,
} from '../../services/redux/authSlice';
import {fetchUserData} from '../../services/redux/profileSlice';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../util/Loader';
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
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const handleSignout = () => {
    dispatch(signOutUser());
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(setLoading(true));
      dispatch(fetchUserData())
        .unwrap()
        .then(userData => {
          if (userData) {
            setUserData({
              name: userData.name || '',
              userImage: userData.profileImage || undefined,
            });
          }
      dispatch(setLoading(false))

        })
        .catch(error => {
          dispatch(setLoading(false));

          console.error(error);
        });
    }, []),
  );
  const renderListItem = ({item}: {item: {id: number; name: string}}) => {
    return <ItemCard name={item.name} />;
  };
  return (
    <View style={styles.container}>
      <Loader Visible={loading} />

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
