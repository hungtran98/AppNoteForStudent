import React, { Component, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail,  Left, Body, Button, Icon  } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import firebase from 'firebase';
import "firebase/firestore";


import ImageModal from 'react-native-image-modal';
import PhotoGrid from 'react-native-thumbnail-grid'

import {FirebaseContext} from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';


const Garellyimages = (props) =>{

    const [listImg, setListImg] = useState([])
    const [name, setName] = useState([])

    const {itemActive}=props

    useEffect(()=>{
      setTimeout(async () => {
    
      //  const _iduser = _.uid
        firebase.firestore().collection("notes").where("idsubject", "==",itemActive)
        .get()
        .then(function(querySnapshot) {
          var listimgs = []
          
            querySnapshot.forEach(function(doc) {
    
             listimgs.push(...doc.data().notePhotoUrl )
            
            });
            setListImg(listimgs)
           // console.log("resulaffffffffffffffffft: ",listimgs)
            // var data = listimgs;
            // let data1 = []
            // data1 = [data[0].
            // console.log("dasfaf",data1)
           
  
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
      },1000)},[])

      
      useEffect(()=>{
        setTimeout(async () => {
      
          
          firebase.firestore().collection("subjects").where("id", "==",itemActive)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
               setName(doc.data().name)
    
              });
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
        },200)},[])



      
  //flatlist for list images
  
  const Item = ({ url }) => (
    <View style={styles.profilePhotoContainers}>
       <ImageModal
          resizeMode="contain"
          imageBackgroundColor="#fff"
          style={{
            width: 150,
            height: 153,
            
          }}
          source={{
            uri: url
          }}
        />
         {/* <Image
      
        source={{
          uri: url
        }}
      /> */}
    </View>
  );

  const renderItem = ({ item }) => (
    <Item url={item.url} />
  );

  //------------------
  
    return(
        
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={{position:"absolute", top: 30, right:5, backgroundColor:"#694fad", borderRadius:28, width: 30, height: 30, alignItems:"center", justifyContent:"center"}} onPress={props.closeimg}>
           <AntDesign name="close" size ={20} color="#fff"  />
        </TouchableOpacity>
       <Text style={styles.title} >{name}</Text>
       
       <View style={{flex:1,marginBottom: 20}}>
          <FlatList
            
            data={listImg}
            horizontal={false}
            renderItem={renderItem}
           numColumns={2}
            keyExtractor={item => item.id}
          />
          </View>
          {/* <PhotoGrid source={listImg} onPressImage={source => renderItem(source)} /> */}


          {/* {
            listImg.map((item,index)=>{
              return(
                <View style={{width:150, height: 150, borderWidth:2, margin:2}}> 
                <Image source={{uri: item.url}} />
                </View>
              )
            })
          } */}

        
      </KeyboardAvoidingView>
     
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: "#fff",
      marginRight: 10,
      
    },
    profilePhotoContainers: {
      backgroundColor: '#e1e2e6',
      width: 140,
      height: 160,
      alignSelf: 'center',
      marginTop: 5,
      overflow: 'hidden',
      shadowRadius:20,
      shadowColor:"#000",
      shadowOpacity:1,
      marginHorizontal: 10,
      borderRadius:10,
      borderWidth:2,
      borderColor: "#e6e6ff"
      
    },
    title:{
      fontWeight: "bold",
      color: "#293d3d",
      marginBottom: 15

    }

});


export default Garellyimages