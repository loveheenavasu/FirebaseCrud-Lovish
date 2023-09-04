import {View, Text, Image} from 'react-native';
import React from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import styles from './styles';
import Layout from '../../components/Layout';
import Label from '../../components/Label';
import CustomButton from '../../components/CustomButton';
import {CommonActions, NavigationProp, useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../components/type';

const Congrats = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  
  const handleSave = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'Main'},
        ],
      }),
    );
  };
  return (
    <BackgroundImage source={require('../../../assets/Splash.png')}>
      <Layout header={false} title="">
        <View style={styles.wrapper}>
          <Image source={require('../../../assets/friendzy.png')} />
          <Label
            selected={true}
            title="Congratulations!"
            styles={styles.heading}
          />
          <Label
            selected={false}
            title="Your account is ready to use!"
            styles={styles.text}
          />
        </View>
        <View style={styles.margintop}>
          <CustomButton
            title="Go to homepage"
            onPress={handleSave}
            marginTop={0}
            backgroundColor="#4B164C"
            textColor="white"
          />
        </View>
      </Layout>
    </BackgroundImage>
  );
};

export default Congrats;
