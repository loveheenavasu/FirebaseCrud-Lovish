import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Right from 'react-native-vector-icons/AntDesign';

interface CardProps {
  name: string;
}

const ItemCard: React.FC<CardProps> = ({ name }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.card}>
        <Text>{name}</Text>
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

export default ItemCard;
