import React, { Component} from 'react';
import { Container, Header, Body, Title, Content, Button, Icon, Footer, FooterTab, Left, Right,
        Item, Input, List, ListItem, Thumbnail} from 'native-base';
import {Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


export default function SearchScreen({navigation}) {

        return(
            <Container>
                <Header searchBar rounded >
                    <Item>
                        <Icon name="ios-search"/>
                        <Input placeholder="Search anything..." />
                        <Icon name="ios-people"/>
                    </Item>

                </Header>

                <Content>
                   
                    <ListItem avatar>
                    <Left>
                        <Thumbnail source={{uri: 'https://wallpapercave.com/wp/wp1812462.jpg'}}/>
                    </Left>
                    <Body>
                        <Text style={styles.Titlename}>ku shin</Text>
                        <Text>You: Chieu nay minh gap nhau duoc...</Text>
                        
                    </Body>
                     </ListItem>
                     <ListItem avatar>
                    <Left>
                        <Thumbnail source={{uri: 'https://i.pinimg.com/originals/ac/50/55/ac50554921f07db67489e8dc9e90caaf.jpg'}}/>
                    </Left>
                    <Body>
                        <Text style={styles.Titlename}>Shizuka</Text>
                        <Text>hsizuka: hihi a deki kì quá đi...</Text>
                      
                    </Body>
                </ListItem>

                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{uri: 'https://tse3.mm.bing.net/th?id=OIP.N4H1IqfI3IqUUEZNAJ2dLAHaH3&pid=Api&P=0&w=300&h=300'}}/>
                    </Left>
                    <Body>
                        <Text style={styles.Titlename}>Nobita kun</Text>
                        <Text>nobita: send a video
                        </Text>
                        
                        
                    </Body>
                     </ListItem>

                     <ListItem avatar>
                    <Left style={styles.Titlename}>
                        <Thumbnail source={{uri: 'https://i.ytimg.com/vi/AvQr5Hu3c4A/maxresdefault.jpg'}}/>
                    </Left>
                    <Body>
                        <Text style={styles.Titlename}>black man</Text>
                        <Text>you: Tới lượt bạn rồi</Text>
                        
                    </Body>
                     </ListItem>

                     <ListItem avatar>
                    <Left>
                        <Thumbnail source={{uri: 'https://tse4.mm.bing.net/th?id=OIP.2f0oe7YiGo_uFeWjS0ijBgHaDt&pid=Api&P=0&w=318&h=160'}}/>
                    </Left>
                    <Body>
                        <Text style={styles.Titlename}>Thanos</Text>
                        <Text>Nos: send a ticker</Text>
                    </Body>
                                  </ListItem>
                       {/* <Button
                          info
                          onPress={() => navigation.push("Notifications")}>
                          <Text>Go again....! </Text>
                      </Button>

                      <Button
                          warning
                          onPress={() => navigation.navigate("Details")}>
                          <Text>Go to detais </Text>
                      </Button>

                      <Button
                          success
                          onPress={() => navigation.goBack()}>
                          <Text>Go Back </Text>
                      </Button> */}
                </Content>

                


            </Container>
        );
    }



const styles = StyleSheet.create({
 
  Titlename: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
  },

});


