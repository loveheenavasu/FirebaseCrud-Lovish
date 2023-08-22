import React from 'react';
import { SafeAreaView, StatusBar, View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from './src/screens/home';
import { LoginScreen } from './src/screens/login';
import { RegisterScreen } from './src/screens/register';
import { ProfileScreen } from './src/screens/profile';
import Home from 'react-native-vector-icons/AntDesign';
import User from 'react-native-vector-icons/AntDesign';
import Setting from 'react-native-vector-icons/AntDesign';
import { BottomtabDot } from './src/components/BottomtabDot';
import SettingScreen from './src/screens/settings';

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
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused }) => (
          <>
            {focused && <BottomtabDot />}
            <User name="user" color={color} size={24} />
          </>
        ),
      }}
    />

    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarShowLabel: false,

        tabBarIcon: ({ color, size, focused }) => (
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

        tabBarIcon: ({ color, size, focused }) => (
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
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
);
export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? Colors.darker : Colors.lighter} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
