import React,{useContext} from 'react';
import {Text, View} from 'react-native';


import AuthStackScreens from './AuthStackScreens';
import MainStackScreens from './MainStackScreen';

import {UserContext} from '../Context/UserContext';

import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from '../Screens/LoadingScreen';

const AppStack = createStackNavigator();

export default function AppStackScreen() {
  const [user] = useContext(UserContext);

  return (
    <AppStack.Navigator headerMode = "none">
    {
      user.isLoggedIn === null ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ): user.isLoggedIn ? (
        <AppStack.Screen name="Main" component={MainStackScreens} />
      ): (<AppStack.Screen name="Auth" component={AuthStackScreens} />)
    }
    
    </AppStack.Navigator>
  );
}