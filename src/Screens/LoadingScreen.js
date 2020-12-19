import React, { Component, useEffect} from 'react';
import { Container, Header, Body, Title, Content, Button,Icon, Footer, FooterTab, Left, Right,
        Card, CardItem, Thumbnail, Separator, ListItem } from 'native-base';
import {Text, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

import {UserContext} from '../Context/UserContext';
import {FirebaseContext} from '../Context/FirebaseContext';



export default function LoadingScreen() {

        const [_, setuser] = React.useContext(UserContext);
        const firebaseoj = React.useContext(FirebaseContext);


        useEffect( ()=>{
          setTimeout(async () => {
              const user = firebaseoj.getCurrentUser();
              if(user) {
                const userInfo = await firebaseoj.getUserInfo(user.uid);
              


              setuser({
                isLoggedIn: true,
                email: userInfo.email,
                uid: user.uid,
                username: userInfo.username,
                profilePhotoUrl: userInfo.profilePhotoUrl
              }) 
            }else {
              setuser( state => ({...state, isLoggedIn: false}));
            }
              
          },2000)
        },[])

        return(
           <View style ={styles.container}>
              <Text style={{color: '#ffffff', fontSize: 24, fontWeight: 'bold'}}>Student NoteApp</Text>
              <LottieView 
                source={require("../../assets/LoadingAnimattion.json")}
                autoPlay
                loop
                style={{width: "70%"}}
               />
           </View>
        );
    }



const styles = StyleSheet.create({
      container: {
        flex: 1, 
        alignItems: "center",
        backgroundColor: '#222222',//'#694fad',
        justifyContent: "center",
      },
      
});
