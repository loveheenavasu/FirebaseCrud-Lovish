import { View } from 'react-native';
import React from 'react';
import Dotsingle from 'react-native-vector-icons/Entypo';

export const BottomtabDot = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: -35,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          overflow: 'hidden',
          transform: [{ rotate: '45deg' }],
        }}>
        <View
          style={{
            position: 'absolute',
            width: 34,
            height: 34,
            borderRadius: 17,
            borderWidth: 3,
            borderColor: 'white',
            transform: [{ rotate: '-45deg' }],
          }}
        />
        <Dotsingle name="dot-single" color={'black'} size={20} />
      </View>
    </View>
  );
};
