  import React from 'react';
  import {Text, View} from 'react-native';

  import { createStackNavigator } from '@react-navigation/stack';

  import SignInScreen from '../Screens/SignInScreen';
  import SignUpScreen from '../Screens/SignUpScreen';

  const AuthStack = createStackNavigator();
  export default function AuthStackScreens(){


    return(
      <AuthStack.Navigator  headerMode='none'>
           
          <AuthStack.Screen name="SignIn" component = {SignInScreen} />   
          <AuthStack.Screen name="SignUp" component = {SignUpScreen} />  
      </AuthStack.Navigator>
    );
  }
