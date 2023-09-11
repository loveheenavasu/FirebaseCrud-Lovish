import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {ToastProvider} from './src/context/ToastContext';
import {Provider} from 'react-redux';
import {store} from './src/services/redux/store';
import Navigator from './src/navigation';


export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Provider store={store}>
        <NavigationContainer>
          <ToastProvider>
            <Navigator/>
          </ToastProvider>
        </NavigationContainer>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
          animated
          hidden={false}
        />
      </Provider>
    </SafeAreaView>
  );
}
