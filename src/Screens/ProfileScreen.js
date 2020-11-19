import React, { Component, useContext} from 'react';
import { Container, Header, Body, Title, Content, Button,Icon, Footer, FooterTab, Left, Right,
        Card, CardItem, Thumbnail, Separator, ListItem } from 'native-base';
import {Text, StyleSheet} from 'react-native';


import {UserContext} from '../Context/UserContext';
import {FirebaseContext} from '../Context/FirebaseContext';
//import { ListAccordionGroupContext } from 'react-native-paper/lib/typescript/src/components/List/ListAccordionGroup';


export default function ProfileScreen() {

  const [user, setUser] = useContext(UserContext);
  const firebaseoj = useContext(FirebaseContext);


  const logOut = async () =>{
    const loggedOut = await firebaseoj.logOut();
    
    if(loggedOut) {
      setUser(state =>({...state,isLoggedIn: false}));
    }
  }

    


  



        return(
            <Container>
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
                  
                    <Thumbnail source={user.profilePhotoUrl === "default" ? require("../../assets/avatar_default.jpg")
                     : {uri: user.profilePhotoUrl} } />
                  
                  <Body>
        <Text style={{fontSize: 17, fontWeight: "bold", color: '#293d3d'}}>{user.username}</Text>
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
