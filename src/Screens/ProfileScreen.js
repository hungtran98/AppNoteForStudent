import React, { Component, useContext, useState, useEffect} from 'react';
import { Container, Header, Body, Title, Content, Button,Icon, Footer, FooterTab, Left, Right,
        Card, CardItem, Thumbnail, Separator, ListItem } from 'native-base';
import {Text, StyleSheet, Modal, Animated, TouchableOpacity} from 'react-native';

import EditProfile from '../Components/EditProfile'
import firebase from 'firebase';
import "firebase/firestore";


import {UserContext} from '../Context/UserContext';
import {FirebaseContext} from '../Context/FirebaseContext';
//import { ListAccordionGroupContext } from 'react-native-paper/lib/typescript/src/components/List/ListAccordionGroup';


export default function ProfileScreen() {

  const [user, setUser] = useContext(UserContext);
  const firebaseoj = useContext(FirebaseContext);
  const [name, setName] = useState(user.username)
  const [photos, setPhoto] = useState('')
  const [id, setId] = useState(user.uid)

  ////---------------------load profile  
  useEffect(()=>{
    setTimeout(async () => {
          firebase.firestore().collection("users").doc(id).get().then(function(doc) {
              if (doc.exists) {
                  console.log("Document data:", doc.data());
                  setName(doc.data().username)
                  setPhoto(doc.data().profilePhotoUrl)
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
    },200)},[])
  

  

  ////-------------------


  const logOut = async () =>{
    const loggedOut = await firebaseoj.logOut();
    
    if(loggedOut) {
      setUser(state =>({...state,isLoggedIn: false}));
    }
  }


  const [editProfile, setEditProfile] = useState(false)
  
  const [itemActive, setitemActive] = useState()
  
     
  const tonggleProfile =()=>{
    setEditProfile(!editProfile)
  }


  const tonggleEditProfile = () =>{
    setitemActive({id, photos, name})
    tonggleProfile()

  }

   


    


  



        return(
            <Container>
              <Modal animationType="slide" visible={editProfile} onRequestClose={()=>tonggleEditProfile()}>
                <EditProfile closeModals={()=>tonggleEditProfile()} itemActive={itemActive} />
              </Modal>
               <Header>
                <Left>
                </Left>
                <Body>
                    <Title style={{fontSize: 17}}>Account</Title>
                </Body>
                <Right>
                </Right>

            </Header>

            <Content>
                <CardItem>
                <Left>
                  {/* <TouchableOpacity onPress={()=>tonggleEditProfile()}>
                      <Thumbnail source={user.profilePhotoUrl === "default" ? require("../../assets/avatar_default.jpg")
                       : {uri: user.profilePhotoUrl} } />
                  </TouchableOpacity> */}
                  <TouchableOpacity onPress={()=>tonggleEditProfile()}>
                      <Thumbnail source={photos === "default" ? require("../../assets/avatar_default.jpg")
                       : {uri:photos}} />
                  </TouchableOpacity>
                  
                  
                  
                  <Body>
        <Text style={{fontSize: 17, fontWeight: "bold", color: '#293d3d'}}>{name}</Text>
                  </Body>
                </Left>
              </CardItem>

              <Separator >
                <Text>Account</Text>
              </Separator>
              <ListItem>
                  <Icon active name="person" />
                  <Text>Switch Accounts</Text>

              </ListItem>
              <ListItem   last>
                <Icon active name="paper"  />
                
                <Text>About</Text>
              </ListItem>


              <Separator >
                <Text>About</Text>
              </Separator>
              <ListItem >
                <Icon active name="glasses" />
                <Text>Help</Text>
              </ListItem>
              <ListItem last>
                <Icon active name="pizza" />
                <Text>Terms of Sevice</Text>
              </ListItem>
              <Button   danger style={{width: 125, margin: 10, backgroundColor: '#293d3d'}} onPress={logOut}>
                <Text style={{color: "#ff5050", fontWeight:'bold',fontSize: 15, paddingLeft: 15}} >Logout</Text>
                <Icon active name="exit" />
                </Button>
             
            </Content>

            
            </Container>
        );
    }
