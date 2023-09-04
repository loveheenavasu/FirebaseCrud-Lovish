import {View, StyleSheet, Text, Image} from 'react-native';
import React from 'react';
import Label from './Label';
import {scale} from '../util/screenSize';

interface NotificationCardProps {
  image: string;
  name: string;
  age: number;
  time: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  image,
  name,
  age,
  time,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
      <View style={styles.imageContainer}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
            resizeMode='cover' 
          />
        </View>

        <View>
          <Label title={`${name}, ${age}`} selected={false} styles={styles.voilet} />
          <Label title={time} selected={true} styles={styles.text} />
              <Label
            title="This person like your profile."
            selected={false}
            styles={styles.text}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 5,
    borderRadius: 30,
    margin: 5,

  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: scale(77),
    height: scale(73),
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  voilet: {
    fontSize: 20,
    color: '#4B164C',
    fontWeight: '500',
  },
  text: {
    color: '#999999',
  },
});

export default NotificationCard;
