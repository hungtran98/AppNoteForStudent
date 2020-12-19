  import React from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  //import { BlurView } from 'expo-blur';
  import Icon from 'react-native-vector-icons/Ionicons';
  import {Ionicons} from '@expo/vector-icons';

  //screens
  import HomeScreen from '../Screens/HomeScreen';
  import SearchScreen from '../Screens/SearchScreen';
  import NotificationScreen from '../Screens/NotificationScreen';
  import ProfileScreen from '../Screens/ProfileScreen';


  import { createStackNavigator } from '@react-navigation/stack';

//navigation
  import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
  import { MaterialCommunityIcons } from '@expo/vector-icons';

  
  export default function MainStackScreen() {
    
    const MainStack = createMaterialBottomTabNavigator();
    
    return(
      <MainStack.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#142952"
      barStyle={{ backgroundColor: '#694fad' }}>
      
          <MainStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={28} /> ),
            }}
          />

          <MainStack.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarLabel: 'Subjects',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="book" color={color} size={26} /> ),
            }}
          />

          <MainStack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{
              tabBarLabel: 'Notifications',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={28} />),
            }}
          />

          <MainStack.Screen
            name="profileScreen"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={28} /> ),
            }}
          />
    </MainStack.Navigator>
  );
}
        

    

