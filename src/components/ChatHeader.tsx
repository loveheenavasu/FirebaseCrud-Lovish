import React, {FC, useState} from 'react';
import {TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Label from './Label';
import UserImage from './UserImage';
import Dot from 'react-native-vector-icons/Entypo';
import ThreeDot from 'react-native-vector-icons/Entypo';
import Exclamation from 'react-native-vector-icons/AntDesign'
import Block from 'react-native-vector-icons/Entypo'
import { scale } from '../util/screenSize';

interface ChatHeaderProps {
  title: string;
  image: string;
  activeColor: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({title, image, activeColor}) => {
  const navigation = useNavigation();
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleToggleModal = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  return (
    <View style={styles.main}>
      <View style={styles.flex}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <View>
          <UserImage
            source={image}
            size={40}
            handleImageChange={() => {}}
            update={false}
          />
          <Dot
            name="dot-single"
            size={40}
            color={activeColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.marginLeft}>
          <Label selected={false} styles={styles.name} title={title} />
          <Label
            selected={false}
            styles={styles.text}
            title={activeColor === '#2BEF83' ? 'Active Now' : 'Not Active'}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleToggleModal}>
        <ThreeDot name="dots-three-vertical" size={24} color="#FF3099" />
      </TouchableOpacity>
      {isOptionsVisible && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Exclamation name="exclamationcircleo" size={20} />
            <Label selected={false} styles={styles.optionText} title="Report" />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
          <TouchableOpacity style={styles.option}>
            <Block name="block" size={20} />
            <Label selected={false} styles={styles.optionText} title="Block" />
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    height: scale(70),

  },
  flex:{
    flexDirection: 'row'
  },
  image: {
    height: scale(40),
    width: 40,
    marginRight: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  name: {
    color: '#000E08',
    fontSize: 20,
  },
  text: {
    color: '#797C7B',
    fontSize: 12,
  },
  icon: {
    position: 'absolute',
    bottom: -12,
    right: -12,
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%', 
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 10,
    padding:10,
    shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
});

export default ChatHeader;
