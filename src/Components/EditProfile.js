import React, { Component, useEffect, useState, useContext } from 'react';
import {Modal, Animated, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, FlatList, View, TextInput, ImageBackground, Image } from 'react-native';
//import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail,  Left, Body, Button, Icon  } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';


import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import "firebase/firestore";


import ImageModal from 'react-native-image-modal';
import PhotoGrid from 'react-native-thumbnail-grid'

import {FirebaseContext} from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';


const EditProfile = (props) =>{

    const {itemActive}=props
    const [id, setId] = useState(itemActive.id)
    const [name, setName] = useState("")
    const [notePhoto, setNotePhoto] = useState("");
    const firebaseobj = useContext(FirebaseContext);
    const [photo, setPhoto] = useState(itemActive.photos)
    

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
      



    

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        //allowsMultipleSelection: true
      });

      if (!result.cancelled) {
        setNotePhoto(result.uri);
        //console.log("xxsaf",notePhoto)
      }
    } catch (error) {
      console.log('error @pickImage: ', error);
    }
  };


  const addprofilePhoto = async () => {
    const status = await getPermission();

    if (status !== 'granted') {
      alert('we need permission to access your camera roll');

      return;
    }
    pickImage();
  };


  const Update = async () => {
    

    const userUpdate = {id, name,  notePhoto };
    
    try {
      const updateUser = await firebaseobj.updateUser(userUpdate);


    } catch (error) {
      console.log('Error @Update: ', error);
    } 
  };



  //  console.log("sssssssssssss",props)
    return( 
        
          <ImageBackground source={{uri:"https://i.pinimg.com/564x/39/5e/cc/395ecc4c765e2783d453424e55fd07d2.jpg"}} style={styles.container}>
              
        <TouchableOpacity style={{position:"absolute", top: 30, right:5, backgroundColor:"#694fad", borderRadius:28, width: 30, height: 30, alignItems:"center", justifyContent:"center"}} onPress={props.closeModals}>
           <AntDesign name="close" size ={20} color="#fff"  />
        </TouchableOpacity>
        
        <Animatable.View animation="fadeInDownBig" duraton="500">
        <View style={styles.profilePhotoContainer}>
          {notePhoto ? (
            <Image style={styles.profilePhoto} source={{uri:notePhoto}} />
          ) : (
            <View style={styles.profilePhoto}>
               <Image style={styles.profilePhoto} source={{uri:photo}}/>
            </View>
          )}
          </View>
          
            {/* <Image style={styles.profilePhotoContainers}  source={{uri:itemActive.profilePhotoUrl}}
            />   */}
            <TouchableOpacity style={{position:"absolute", top: 30, right:5, backgroundColor:"#694fad", borderRadius:28, width: 30, height: 30, alignItems:"center", justifyContent:"center"}} onPress={()=>addprofilePhoto()}>
                <AntDesign name="camera" size ={20} color="#fff"  />
            </TouchableOpacity>
        </Animatable.View> 
        <Animatable.Text animation="fadeInUpBig" duraton="900" style={styles.title} >{name}</Animatable.Text>
        <TextInput  style={{width: 300, height:50, borderColor:"#19334d", borderRadius: 10, borderWidth: 2}} 
        placeholder="   Edit name..." 
        onChangeText={name => setName(name)}/>
        <TouchableOpacity style={{width: 150, height: 50, backgroundColor:"#694fad", marginTop: 20, borderRadius: 10, justifyContent:"center", alignItems:"center",
            borderWidth:2, borderColor:"#fff"}} onPress={()=>Update()}>
            <Text style={{color:"#fff", fontWeight:"bold"}}>Update</Text>
        </TouchableOpacity>
      </ImageBackground>
        

     
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
      height: 120,
      alignSelf: 'center',
      marginTop: 5,
      overflow: 'hidden',
      shadowRadius:20,
      shadowColor:"#000",
      shadowOpacity:1,
      marginHorizontal: 10,
      borderRadius:80,
      borderWidth:3,
      borderColor: "#ecf2f9",
      

      
    },
    title:{
      fontWeight: "bold",
      color: "#371A2F",
      marginBottom: 15,
      fontSize: 27

    },
    notescontainer: {
      height:250,
      borderWidth: 2, 
      borderColor: "#fff", 
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: "#b3cce6",
      shadowRadius: 20,
      
    },
    notes: {
      marginLeft: 10,
      marginTop: 10

    },
    profilePhotoContainer: {
        backgroundColor: '#e1e2e6',
        width: 120,
        height: 120,
        borderRadius: 70,
        alignSelf: 'center',
        marginTop: 12,
        overflow: 'hidden',
        borderWidth:5,
        borderColor:"#FFF5EB"
    
      },
      profilePhoto: {
        flex: 1,
   
        
        
      },



});


export default EditProfile