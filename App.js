import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {UserProvider} from './src/Context/UserContext';
import {FirebaseProvider} from './src/Context/FirebaseContext';
import AppStackScreens from './src/Stacks/AppStackScreens';



// You can import from local files
import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreens/>
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
    

  );
}

