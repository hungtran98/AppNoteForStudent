import React, { Component, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, FlatList, View, TextInput, ImageBackground } from 'react-native';
//import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail,  Left, Body, Button, Icon  } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import firebase from 'firebase';
import "firebase/firestore";


import ImageModal from 'react-native-image-modal';
import PhotoGrid from 'react-native-thumbnail-grid'

import {FirebaseContext} from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';


const Garellyimages = (props) =>{

    const [listImg, setListImg] = useState([])
    const [img, setImg] = useState([])
    const [name, setName] = useState([])
    const [notesub, setNoteSub] = useState([])
    const [datesub, setDatesub] = useState([])
    const [dt,setDt] = useState()
    

    const {itemActive}=props

    useEffect(()=>{
      setTimeout(async () => {
        
     
        firebase.firestore().collection("notes").where("idsubject", "==",itemActive).get()
        .then(function(querySnapshot) {
          var listimgs = []
          var listnotes = []
          
            
            querySnapshot.forEach(function(doc) {
              
           //  dates = new Date(doc.data().date.getTime())
             listimgs.push(...doc.data().notePhotoUrl )
             
          
  
             listnotes.push({...doc.data() })
          
        //     console.log("sssssssssssssss",listnotes)
                
              
            });
          var dates = []
          listnotes.map(item=>{
            
          dates.push(item.dstmp)
          })

        //   var dates2 = []
        //  dates.map(item=>{
        //   var datesnum = item.split("-")
        //   var num = datesnum[0] + datesnum[1] + datesnum[2]
        //   dates2.push(num)
        //  })
      
          dates.sort()

          var listnotes2 =[]
          dates.map(item=>{
            listnotes.map(itm=>{
              if(item===itm.dstmp){
                listnotes2.push({content:itm.content, date: itm.date, notePhotoUrl: itm.notePhotoUrl})
              }
            })
          })



           //----------------------------------------
            setListImg(listimgs)
            setNoteSub(listnotes2)
           // console.log("------------------------",listnotes2)



           
          
   
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
      },300)},[])


     
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
  
  // const Item = ({ url }) => (
  //   <View style={styles.profilePhotoContainers}>
      
  //      <ImageModal
  //         resizeMode="contain"
  //         imageBackgroundColor="#fff"
  //         style={{
  //           width: 150,
  //           height: 153,
            
  //         }}
  //         source={{
  //           uri: url
  //         }}
  //       />
  //        {/* <Image
      
  //       source={{
  //         uri: url
  //       }}
  //     /> */}
  //   </View>
  // );

  // const renderItem = ({ item }) => (
  //   <Item url={item.url} />
  // );

  //------------------
  



  //--render flat list note and image
  
  // const Item = ({ url }) => (
  //   <View style={styles.profilePhotoContainers}>
      
  //      <ImageModal
  //         resizeMode="contain"
  //         imageBackgroundColor="#fff"
  //         style={{
  //           width: 150,
  //           height: 153,
            
  //         }}
  //         source={{
  //           uri: url
  //         }}
  //       />
  //        {/* <Image
      
  //       source={{
  //         uri: url
  //       }}
  //     /> */}
  //   </View>
  // );

  const renderItem = ({ item }) => (
    <Item notes={item} />
  );

  const renderImages = ({item}) => (
    <Imgs  images={item} />
  );

  const Imgs = ({ images }) => (
    <View style={styles.profilePhotoContainers}>
      
       <ImageModal
          resizeMode="contain"
          imageBackgroundColor="#fff"
          style={{
            width: 150,
            height: 153,
            
          }}
          source={{
            uri: images.url
          }}
        />
         {/* <Image
      
        source={{
          uri: url
        }}
      /> */}
    </View>
  );
 

     
  const Item = ({notes}) => {
 
    let imgsub = notes.notePhotoUrl
   
    return(
    <View style={styles.notescontainer}>
      <View style={styles.notes}>
    
      <View style={{ borderWidth:1,
      marginBottom: 10, width: 100, padding: 5, borderRadius: 10, backgroundColor:"#4775d1", borderColor: "#4775d1",}}>
      <Text style={{color: "#fff", fontStyle:"italic", fontSize: 10,
      }}>{notes.date}</Text>
      </View>
       
        <Text style={{color: "#fff", fontWeight: "bold"}}>{notes.content}</Text>
      </View>
      
      <View style={{flex:1}}>
      <FlatList
            
            data={imgsub}
            horizontal={true}
            renderItem={renderImages}
           // numColumns={2}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
    
      </View>
      
    </View>

    )
  };

  


 

  //----------------------
    return( 
        
       // <KeyboardAvoidingView style={styles.container} behavior="padding">
          <ImageBackground source={require("../../assets/bgsubject.jpg")} style={styles.container}>
        <TouchableOpacity style={{position:"absolute", top: 30, right:5, backgroundColor:"#694fad", borderRadius:28, width: 30, height: 30, alignItems:"center", justifyContent:"center"}} onPress={props.closeimg}>
           <AntDesign name="close" size ={20} color="#fff"  />
        </TouchableOpacity>
       <Text style={styles.title} >{name}</Text>
       
       <View style={{flex:1,marginBottom: 20}}>
          <FlatList
            
            data={notesub}
            horizontal={false}
            renderItem={renderItem}
         //   numColumns={2}
            keyExtractor={item => item.id}
            
            
            showsVerticalScrollIndicator={false}
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

      </ImageBackground>
        
    //  </KeyboardAvoidingView>
     
    )
}





const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: "#fff",
      
      
    },
    profilePhotoContainers: {
      backgroundColor: '#e1e2e6',
      width: 120,
      height: 140,
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
      color: "#fff",
      marginBottom: 15

    },
    notescontainer: {
      height:250,
      borderWidth: 2, 
      borderColor: "#b3cce6", 
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: "#b3cce6",
      shadowRadius: 20,
      
    },
    notes: {
      marginLeft: 10,
      marginTop: 10

    }



});


export default Garellyimages