import {View, Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import CardDecker from '../../components/CardDecker';
import { Header } from '../../components/ImageHeader';

export const HomeScreen = () => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
        <View style={styles.wrapper}>
          <Header marginTop={10} marginBottom={0}/>
          <CardDecker/>
        </View>
    </KeyboardAvoidingView>
  );
};
