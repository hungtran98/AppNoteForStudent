import React, { Component, useEffect, useState} from 'react';
import { Container, Header, Body, Title, Content, Button, Footer, FooterTab, Left, Right, Icon, Item,Input,
        List, ListItem, Thumbnail } from 'native-base';
import {Text, StyleSheet, TextInput, View, FlatList, TouchableOpacity, Animated, Modal} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


//import { createStackNavigator } from '@react-navigation/stack';
  

import {Swipeable} from 'react-native-gesture-handler'


import firebase from 'firebase';
import "firebase/firestore";

import {FirebaseContext} from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';
import { VirtualizedList } from 'react-native';
import Garellyimages from '../Components/GarellyImages'



export default function SearchScreen({navigation}) {

  const [subject, setSubject] = useState('')
  const [idSubject, setIdSubject] = useState('')
  const [_, setUser] = React.useContext(UserContext);
  const [list, setList] = useState([])

  useEffect(()=>{
    setTimeout(async () => {
  
      const _iduser = _.uid
      firebase.firestore().collection("subjects").where("userid", "==",_iduser)
      .get()
      .then(function(querySnapshot) {
        var listsubject = []
          querySnapshot.forEach(function(doc) {
           listsubject.push({ id:doc.id,...doc.data()} )
          });
          setList(listsubject)
        

         

      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    },1000)},[])



    const Item = ({ name, idsub}) => (
      <Swipeable  renderRightActions={(_, dragX)=>rightAction(dragX,name)}>
        <Button style={styles.item} onPress={()=>tonggleShowimg(name, idsub)} >
          <Text style={styles.title}>{idsub}</Text>
        </Button>
      </Swipeable>
    );


    
  const [show, setShow] = useState(false) 

  const tonggleShow =()=>{
    setShow(!show)

  }
  const [itemActive, setitemActive] = useState({})

  const tonggleShowimg = (item) => {
    setitemActive(item)
    tonggleShow()
  }
    const renderItem = ({ item }) => {
      
      return(
    <View>
      <Modal animationType="slide" visible={show} onRequestClose={()=>tonggleShow()}>
        <Garellyimages closeimg={()=>tonggleShowimg()} itemActive = {itemActive}/>
      </Modal>
      <Item name={item.id} idsub = {item.name} />
    </View>
    );
    }
   
  
    const rightAction = (dragX, name) =>{
      const scale = dragX.interpolate({
          inputRange: [-100,0],
          outputRange: [1,0.9], 
          extrapolate: "clamp"
      }) 

      const opacitys = dragX.interpolate({
        inputRange: [-100, -20, 0],
        outputRange: [1, 0.9, 0],
        extrapolate: "clamp"
      })
      return(
        <TouchableOpacity style={{height: 50, marginTop:8, marginRight:20,}} onPress={()=>deleteSubject(name)}>
          <Animated.View style={[styles.deletebutton,{ opacity: opacitys}]}>
            
          <AntDesign name="delete" size={22} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      )
  
      
    }


   
    const deleteSubject =(name)=>{
      firebase.firestore().collection("subjects").doc(name).delete().then(function() {
        console.log("Document subject deleted!");
        const newList = list.filter(item=>item.id!==name)
        setList(newList)
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    
    }


    
  const addSubject = () => {
    const _iduser = _.uid
    const idrandom = "Sub" + Math.random().toString().substr(2,8)
   firebase.firestore().collection("subjects").doc(idrandom).set({
     id: idrandom,
     name: subject,
     userid: _iduser,
    })
    const data = {
      id: idrandom,
      name: subject,
      userid: _iduser,
      
    }
    setList([...list,data])
  }
       
  return(

    
            <Container>
              
                
            <Header>
                <Title style={{marginTop:15}}>subjects</Title>
            </Header>

            <Content>
            <TextInput style={styles.input} autoFocus={true} placeholder="Add subjects for event..." onChangeText = {subject => setSubject(subject)} />
            <Button block success style={{backgroundColor:"#694fad", marginTop: 20, width: 300, marginLeft: 37, marginBottom: 15}} onPress={()=>addSubject()}>
              <Text style={{color:"#fff", fontWeight:"bold"}}>Creat</Text>
            </Button>
                   

            <View style={{flex:1, }}>
     
              <FlatList 
                data={list}
                renderItem={renderItem}
                keyExtractor={item => item.id}                
              />
            </View>
            
    
            </Content>
            

        </Container>
        );
    }


    
    const styles = StyleSheet.create({
      item: {
        backgroundColor: '#b3b3ff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        width: 345,
        height: 50,
        justifyContent:"center"
      },
      title: {
        fontSize: 15,
        color: "#fff",
        fontWeight:"bold"
      },
      input:{
        height:45,
        borderWidth:1,
        width: 340,
        borderRadius: 10,
        borderColor: "#85a3e0",
        marginLeft: 17,
        marginBottom: 10,
        marginTop: 10

      },
      deletebutton: {
        flex:1, backgroundColor: "red", justifyContent:"center", alignItems:"center", width:100, height:100, borderBottomEndRadius: 10
        , borderTopRightRadius: 10, 

      }
    });
    
    
  

  