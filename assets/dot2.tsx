import { View } from 'react-native';
import React from 'react';
import Dotsingle from 'react-native-vector-icons/Entypo';

export const BottomtabDot = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top:0,
        left: '50%',
        marginLeft: -15, // Half of the width to center the triangle
        width: 0,
        height: 0,
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        transform: [{ rotate: '180deg' }],
        alignItems: 'center', // Center the icon horizontally
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0, // Adjust as needed to position the dot within the triangle
        }}>
        <Dotsingle name="dot-single" color={'black'} size={20} />
      </View>
    </View>
  );
};
