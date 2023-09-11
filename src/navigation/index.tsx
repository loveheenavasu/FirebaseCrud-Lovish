import React, {FC, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import * as Storage from '../service';
import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/chat';
import {HomeScreen} from '../screens/home';
import SettingScreen from '../screens/settings';
import {LoginScreen} from '../screens/login';
import {RegisterScreen} from '../screens/register';
import {ProfileScreen} from '../screens/profile';
import InterestsScreen from '../screens/interests';
import SearchCriteriaScreen from '../screens/searchcriteria';
import GoVipScreen from '../screens/vip';
import ForgetPasswordScreen from '../screens/forgetpassword';
import OtpScreen from '../screens/forgototp';
import ChangePassword from '../screens/changepassword';
import Congrats from '../screens/congrats';
import NotificationsScreen from '../screens/notifications';
import ChatDetailScreen from '../screens/chatdetail';

import {BottomtabDot} from '../components/BottomtabDot';
import Home from 'react-native-vector-icons/AntDesign';
import Chat from 'react-native-vector-icons/Ionicons';
import Setting from 'react-native-vector-icons/AntDesign';
import Loader from '../util/Loader';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator: FC = () => {
  const [email, setEmail] = useState<string>();
  const [showLoader, setShowLoader] = useState<boolean>(true);
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
  const AuthStackNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{animation: 'fade'}}
      />
    </Stack.Navigator>
  );
  const AppNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={TabNavigator} />
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
    </Stack.Navigator>
  );


  const onAuthStateChanged = (user: any) => {
    if (user) {
      Storage.storeData('USER_ID', user?.uid);
      setShowLoader(false);
      setEmail(user?.email);
    } else {
      setShowLoader(false);
      setEmail('');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={{flex: 1}}>
      {showLoader ? (
        <Loader Visible={showLoader} />
      ) : (
        <>{!email ? <AuthStackNavigator /> : <AppNavigator />}</>
      )}
    </View>
  );
};

export default Navigator;
