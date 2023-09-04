import React, {FC} from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Label from './Label';
import { scale } from '../util/screenSize';

interface BackHeaderProps {
  title: string;
}

const BackHeader: FC<BackHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBackPress} style={styles.container}>
      <Image source={require('../../assets/back.png')} style={styles.image} />
      <Label selected={false} styles={styles.text} title={title} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 10,
    alignSelf:'flex-start',
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 10, 
  },
  text: {
    color: '#3E4958',
    fontWeight: '500',
    fontSize: 20,
    marginBottom:4
  },
});

export default BackHeader;
