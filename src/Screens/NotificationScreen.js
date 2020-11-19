import React, { Component} from 'react';
import { Container, Header, Body, Title, Content, Button,Icon, Footer, FooterTab, Left, Right,
        List, ListItem, Thumbnail } from 'native-base';
import {Text, StyleSheet} from 'react-native';


export default function NotificationScreen() {

        return(
            <Container>
            <Header>
                <Left />
                <Body>
                    <Title style={{fontSize: 15}}>Notification</Title>
                </Body>
                <Right />

            </Header>

            <Content>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{uri: 'https://wallpapercave.com/wp/wp1812462.jpg'}}/>
                    </Left>
                    <Body>
                        <Text>ku shin</Text>
                        <Text>Thong bao tu cu shin...</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{uri: 'https://i.pinimg.com/originals/ac/50/55/ac50554921f07db67489e8dc9e90caaf.jpg'}}/>
                    </Left>
                    <Body>
                        <Text>Shizuka</Text>
                        <Text>Thong bao tu Shizuka...</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{uri: 'https://image.tmdb.org/t/p/original/fRLftkwv8jm3DLxXOf2NbngHjPB.jpg'}}/>
                    </Left>
                    <Body>
                        <Text>John Wick</Text>
                        <Text>Thong bao tu John Wick...</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{uri: 'https://tse3.mm.bing.net/th?id=OIP.q7yYqCxs9jZY8RtcWJUxTQHaEK&pid=Api&P=0&w=297&h=168'}}                  />
                    </Left>
                    <Body>
                        <Text>nobita</Text>
                        <Text>Thong bao tu nobita haha...</Text>
                    </Body>
                </ListItem>
            </Content>
            

        </Container>
        );
    }