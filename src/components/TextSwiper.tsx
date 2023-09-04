import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import Label from './Label';

const TextSwiper: React.FC = () => {
  return (
    <Swiper loop={true} showsButtons={false}>
      <View style={styles.slide}>
        <Label
          styles={styles.text}
          selected={false}
          title="Get full access to top picks,likes you, Send Unlimited Likes& more"
        />
      </View>
      <View style={styles.slide}>
        <Label
          styles={styles.text}
          selected={false}
          title="Get full access to top picks,likes you, Send Unlimited Likes& more"
        />
      </View>
      <View style={styles.slide}>
        <Label
          styles={styles.text}
          selected={false}
          title="Get full access to top picks,likes you, Send Unlimited Likes& more"
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  text: {
    color: '#EF5DA8',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default TextSwiper;
