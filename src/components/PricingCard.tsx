import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Right from 'react-native-vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { navigationProps } from './type';
import Label from './Label';

interface CardProps {
  name: string;
}

const PricingCard: React.FC<CardProps> = ({ name }) => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const handleCardPress = () => {
    switch (name) {
      case 'Change Interests':
        navigation.navigate('Interest'); // Replace 'EditProfile' with the actual screen name
        break;
      case 'Search criteria':
        navigation.navigate('SearchCriteria'); // Replace 'SearchCriteria' with the actual screen name
        break;
      case 'Go Upgrade Vip':
        navigation.navigate('GoVip');
        break;
      case 'Forget Password':
        navigation.navigate('ForgetPassword'); // Replace 'ForgetPassword' with the actual screen name
        break;
      default:
        // Handle other cases or do nothing
        break;
    }
  };
  return (
    <TouchableOpacity style={styles.cardContainer}onPress={handleCardPress} >
      <View style={styles.card}>
        <Label title={name} selected={false} styles={{}}/>
        <Right name='right' size={26}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    elevation: 4, // Add elevation for Android shadow
    shadowColor: 'black', // Add shadow for iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginVertical: 5,
    borderRadius:15,
    marginHorizontal:2
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default PricingCard;
