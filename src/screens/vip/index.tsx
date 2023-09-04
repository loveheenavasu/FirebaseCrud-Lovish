import React from 'react';
import {View} from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import {styles} from './styles';
import ImageHeader from '../../components/ImageHeader';
import TextSwiper from '../../components/TextSwiper';
import MembershipCard from '../../components/MembershipCard';
import CustomButton from '../../components/CustomButton';
import Layout from '../../components/Layout';

const GoVipScreen = () => {
  return (
    <BackgroundImage source={require('../../../assets/Splash.png')}>
      <Layout title='Choose Best Plan' header={true}>
          {/* <BackHeader title='Choose Best Plan'/> */}
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.shadow}>
            <ImageHeader title="" marginTop={10} marginBottom={10} />
            <View style={{flex: 0.6}}>
              <TextSwiper />
            </View>
            <MembershipCard />
          </View>
          <View style={styles.button}>

            <CustomButton
              title="Upgrade"
              onPress={()=>{}}
              marginTop={20}
              backgroundColor="#4B164C"
              textColor="white"
            />
          </View>

        </View>
      </View>
      </Layout>
    </BackgroundImage>

  );
};

export default GoVipScreen;
