import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeScreen} from './src/screens/home';
import {LoginScreen} from './src/screens/login';
import {RegisterScreen} from './src/screens/register';
import {ProfileScreen} from './src/screens/profile';
import Home from 'react-native-vector-icons/AntDesign';
import Chat from 'react-native-vector-icons/Ionicons';
import Setting from 'react-native-vector-icons/AntDesign';
import {BottomtabDot} from './src/components/BottomtabDot';
import SettingScreen from './src/screens/settings';
import SearchCriteriaScreen from './src/screens/searchcriteria';
import InterestsScreen from './src/screens/interests';
import GoVipScreen from './src/screens/vip';
import ForgetPasswordScreen from './src/screens/forgetpassword';
import SplashScreen from 'react-native-splash-screen';
import OtpScreen from './src/screens/forgototp';
import ChangePassword from './src/screens/changepassword';
import Congrats from './src/screens/congrats';
import {ToastProvider} from './src/context/ToastContext';
import NotificationsScreen from './src/screens/notifications';
import ChatScreen from './src/screens/chat';
import ChatDetailScreen from './src/screens/chatdetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false, // Hide header for all tab screens
      tabBarActiveTintColor: '#fff', // Set the active tab color
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#4B164C',
        height: 60,
      },
    }}>
    <Tab.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({color, focused}) => (
          <>
            {focused && <BottomtabDot />}
            <Chat name="chatbox" color={color} size={24} />
          </>
        ),
      }}
    />

    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarShowLabel: false,

        tabBarIcon: ({color, focused}) => (
          <>
            {focused && <BottomtabDot />}
            <Home name="home" color={color} size={24} />
          </>
        ),
      }}
    />
    <Tab.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        tabBarShowLabel: false,

        tabBarIcon: ({color, focused}) => (
          <>
            {focused && <BottomtabDot />}
            <Setting name="setting" color={color} size={24} />
          </>
        ),
      }}
    />
  </Tab.Navigator>
);
const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{animation: 'fade'}}
    />
    <Stack.Screen
      name="Interest"
      component={InterestsScreen}
      options={{animation: 'fade'}}
    />
    <Stack.Screen
      name="SearchCriteria"
      component={SearchCriteriaScreen}
      options={{animation: 'fade'}}
    />
    <Stack.Screen
      name="GoVip"
      component={GoVipScreen}
      options={{animation: 'fade'}}
    />
    <Stack.Screen
      name="ForgetPassword"
      component={ForgetPasswordScreen}
      options={{animation: 'fade'}}
    />
    <Stack.Screen
      name="OTP"
      component={OtpScreen}
      options={{animation: 'fade'}}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{animation: 'fade'}}
    />
    <Stack.Screen
      name="Congrats"
      component={Congrats}
      options={{animation: 'fade'}}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{animation: 'fade'}}
    />
    <Stack.Screen
      name="ChatDetail"
      component={ChatDetailScreen}
      options={{animation: 'fade'}}
    />
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
);
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
      
      <NavigationContainer>
        <ToastProvider>
          
          <AppNavigator />
        </ToastProvider>
      </NavigationContainer>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated
        hidden={false}
      />
    </SafeAreaView>
  );
}
