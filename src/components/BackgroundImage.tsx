// BackgroundImage.js
import React, {FC, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ImageURISource,
  ImageRequireSource,
} from 'react-native';
interface imageProps {
  source: ImageURISource | ImageRequireSource;
  children: ReactNode;
}
const BackgroundImage: FC<imageProps> = ({source, children}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={source} style={styles.imageBackground}>
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default BackgroundImage;
