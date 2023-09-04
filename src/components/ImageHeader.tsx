import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {navigationProps} from './type';

interface CustomizedHeader {
  title: string;
  marginTop: number;
  marginBottom: number;
}
interface Header {
  marginTop: number;
  marginBottom: number;
}

const ImageHeader: React.FC<CustomizedHeader> = ({
  title,
  marginTop,
  marginBottom,
}) => (
  <View
    style={{
      marginBottom: marginBottom,
      marginTop: marginTop,
      alignSelf: 'center',
    }}>
    <Image source={require('../../assets/friendzy.png')} />
    <Text style={styles.text}>{title}</Text>
  </View>
);

export const Header: React.FC<Header> = ({marginTop, marginBottom}) => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();

  return (
    <View
      style={[
        styles.imageView,
        {marginBottom: marginBottom, marginTop: marginTop},
      ]}>
      <Image source={require('../../assets/logo.png')} />
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Image source={require('../../assets/notification.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ImageHeader;
