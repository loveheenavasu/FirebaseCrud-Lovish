import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

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
  <View style={{marginBottom: marginBottom, marginTop: marginTop}}>
    <Image source={require('../../assets/friendzy.png')} />
    <Text style={styles.text}>{title}</Text>
  </View>
);

export const Header: React.FC<Header> = ({marginTop, marginBottom}) => (
  <View
    style={[
      styles.imageView,
      {marginBottom: marginBottom, marginTop: marginTop},
    ]}>
    <Image source={require('../../assets/logo.png')} />
    <Image source={require('../../assets/notification.png')} />
  </View>
);

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
