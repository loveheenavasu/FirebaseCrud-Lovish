import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import Label from './Label';
import {scale} from '../util/screenSize';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {navigationProps} from './type';

interface ChatCardProps {
  image: string;
  name: string;
  bio:string;
  currentuserId:string;
  otheruserId:string;
}

const ChatCard: FC<ChatCardProps> = ({image, name,bio,currentuserId,otheruserId}) => {
  const truncatedName = name.length > 20 ? name.slice(0, 20) + '...' : name;
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('ChatDetail', {
          name,
          image,
          currentuserId,
          otheruserId,
        });
      }}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View>
          <View style={styles.flex}>
            <Label
              title={truncatedName}
              selected={false}
              styles={styles.voilet}
            />
            <Label title={bio} selected={true} styles={styles.text} />
          </View>
          <Label
            title="This person like your profile."
            selected={false}
            styles={styles.text}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: scale(52),
    height: scale(52),
    borderRadius: 31,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: scale(290),
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

export default ChatCard;
