import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Dotsingle from 'react-native-vector-icons/Entypo';

export const BottomtabDot = () => {
  return (
    <View
      style={styles.container}>
      <Image
        source={require('../../assets/design.jpg')}
        style={styles.image}
      />
      <Dotsingle
        name="dot-single"
        style={styles.icon}
        color={'black'}
        size={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    height: 20,
    width: 100,
    position: 'absolute',
    top: -18.2,
  },
  icon:{
    position: 'absolute',
    top: -20,
  }
})
