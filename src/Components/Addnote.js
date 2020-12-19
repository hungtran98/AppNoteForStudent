import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, Modal, KeyboardAvoidingView , FlatList, TouchableOpacity, TextInput, ScrollView, Platform, Button} from 'react-native';
import {AntDesign} from "@expo/vector-icons"
import { Container, Header, Content, Textarea, Form } from "native-base";

//import dataref from '../tempData'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import UpdateEventModal from './UpdateEventModal'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import "firebase/firestore";


import ImageModal from 'react-native-image-modal';

import {FirebaseContext} from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';


const AddNoteModal = (props) => {


  const {itemActive}=props



  const [name, setName] = useState(itemActive.name)
  const [updateEvent, setUpdateEvent] = useState(false)
  
  const [content, setContent] = useState("")
  const [idsubject, setIdSubject] = useState(itemActive.idsubject)
  const [notePhoto, setNotePhoto] = useState();
  const [idnote, setIdNote] = useState('')
  const [_, setUser] = React.useContext(UserContext);
  const  firebaseoj = React.useContext(FirebaseContext);
  const [idnt, setIdnt] = useState()
  const [idev, setIdEv] = useState()
  const [images, setImages] = useState([])
  const [idevent, setIdEvent] = useState(itemActive.id)
  const [countimage, setCountImage] = useState(0)


 

  // useEffect(()=>{
  //   setTimeout(async () => {
  
      
  //     firebase.firestore().collection("Notes").where("idevent", "==",itemActive.id)
  //     .get()
  //     .then(function(querySnapshot) {
  //         querySnapshot.forEach(function(doc) {
  //             // doc.data() is never undefined for query doc snapshots
  //            setContent(doc.data().content)
  //            setIdnt(doc.data().id)
  //          //  setIdEv(doc.data().idevent)
  //            setImages(doc.data().notePhotoUrl)
  //         });
  //     })
  //     .catch(function(error) {
  //         console.log("Error getting documents: ", error);
  //     });
  //   },200)},[])
  
  useEffect(()=>{
    setTimeout(async () => {
  
      
      firebase.firestore().collection("notes").where("idevent", "==",itemActive.id)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
             setContent(doc.data().content)
             setIdnt(doc.data().id)
           //  setIdEv(doc.data().idevent)
             setImages(doc.data().notePhotoUrl)
             setCountImage(images.length)
           //  setIdSubject(doc.data().idsubject)

          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    },200)},[])
  
//console.log(images[0])





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


  const takeImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
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


  
  const addtakephoto = async () => {
    const status = await getPermission();

    if (status !== 'granted') {
      alert('we need permission to access your camera roll');

      return;
    }
    takeImage();
  };

  const CreateNote = async () => {
    //setLoading(true);
    const idrandom = "Note" + Math.random().toString().substr(2,8)
    setIdNote(idrandom)
    //console.log("idnote la: ",idnote)
    const note = {idevent,idrandom, content, notePhoto };

    
    
    try {
      const creactenote = await firebaseoj.createNote(note);

    itemActive.closeModals();

    } catch (error) {
      console.log('Error @createEVT: ', error);
    } finally {
     // setLoading(false);

    }
  };

  const updateNote = async () => {
    //setLoading(true);
   
    //console.log("idnote la: ",idnote)
    const note = {idevent,content, notePhoto };

    
    
    try {
      const updatenote = await firebaseoj.updatenote(note);

    itemActive.closeModals();

    } catch (error) {
      console.log('Error @createEVT: ', error);
    } finally {
     // setLoading(false);

    }
  };

  
  //---------------creat and update multie images--------------------

  const createNoteMultie = async () => {
    //setLoading(true);
    const idrandom = "Note" + Math.random().toString().substr(2,8)
    setIdNote(idrandom)
    
    const note = {idevent,idrandom, idsubject, content, notePhoto, countimage };

    
    
    try {
      const creactenote = await firebaseoj.createNoteMultie(note);
      firebase.firestore().collection("notes").where("idevent", "==",itemActive.id)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
             setContent(doc.data().content)
             setIdnt(doc.data().id)
           //  setIdEv(doc.data().idevent)
             setImages(doc.data().notePhotoUrl)
             setCountImage(images.length)

          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

    itemActive.closeModals();

    } catch (error) {
      console.log('Error @createEVT: ', error);
    } finally {
     // setLoading(false);

    }
  };

  const updateNoteMultie = async () => {
   

    //const countimages = images.length()
    const note = {countimage, images, idevent,content, notePhoto };

    //console.log(countimages,"asafsgg")


    
    
    
    try {
      const updatenotemultie = await firebaseoj.updateNoteMultie(note);
      firebase.firestore().collection("notes").where("idevent", "==",itemActive.id)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
             setContent(doc.data().content)
             setIdnt(doc.data().id)
           //  setIdEv(doc.data().idevent)
             setImages(doc.data().notePhotoUrl)
             setCountImage(images.length)

          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

    itemActive.closeModals();

    } catch (error) {
      console.log('Error @createEVT: ', error);
    } finally {
     // setLoading(false);

    }
  };








  //---------------------images-----------------------

  const tonggleEvent =()=>{
    setUpdateEvent(!updateEvent)
  }
  //const {itemActive}=props
  const tonggleUpdateEvent = () => {
    tonggleEvent()
  }


  // //flatlist for list images
  
  // const Item = ({ url }) => (
  //   <View style={styles.profilePhotoContainers}>
  //       <Image  style={styles.profilePhoto} source={{uri: url}} />
  //   </View>
  // );

  // const renderItem = ({ item }) => (
  //   <Item url={item.url} />
  // );

  // //------------------
  
  //flatlist for list images
  
  const Item = ({ url }) => (
    <View style={styles.profilePhotoContainers}>
        <ImageModal
          resizeMode="contain"
          imageBackgroundColor="#b3b3ff"
          style={{
            width: 120,
            height: 150,
          }}
          source={{
            uri: url
          }}
        />
    </View>
  );

  const renderItem = ({ item }) => (
    <Item url={item.url} />
  );

  //------------------



  


  return (
   <KeyboardAvoidingView style={styles.container} behavior="padding">
   <Modal animationType="slide" visible={updateEvent} onRequestClose={()=>tonggleUpdateEvent()}>
            <UpdateEventModal closeModals={()=>tonggleUpdateEvent()}  itemActive={itemActive} />
     </Modal>
   
      <TouchableOpacity style={{position:"absolute", top: 30, right:5, backgroundColor:"#694fad", borderRadius:28, width: 28, height:           30, alignItems:"center", justifyContent:"center"}} onPress={props.closeModals}>
        <AntDesign name="close" size ={20} color="#fff"  />
      </TouchableOpacity>

       <TouchableOpacity style={{position:"absolute", top: 80, right:5, backgroundColor:"#694fad", borderRadius:28, width: 28, height:           30, alignItems:"center", justifyContent:"center"}} onPress={()=>tonggleEvent()}>
        <AntDesign name="edit" size ={20} color="#fff"  />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>

  <Text style={styles.title}>{name}</Text>
         <Form>
            <Textarea autoFocus={true} placeholder="Note something ..." style={{borderColor: "#ccb3ff", borderRadius: 6}} rowSpan={12} bordered value={content} onChangeText={content => setContent(content)}
/>
          </Form>

      <View style={{flexDirection: "row", justifyContent:"space-between"}}>
         <TouchableOpacity style={styles.camera} >
          <AntDesign name="picture" size={30} color="#476b6b" onPress={()=>addprofilePhoto()}/>
         </TouchableOpacity>
         <TouchableOpacity style={styles.camera} >
          <AntDesign name="camera" size={30} color="#476b6b" onPress={()=>addtakephoto()}/>
         </TouchableOpacity>
      </View>
      
        
      <View style={{flex:1}}>
            {idnt ?
                    (<TouchableOpacity style={[styles.create, {backgroundColor:props.itemActive.color}]} onPress={()=>updateNoteMultie()}>
                      <Text style={{color: "#fff", fontWeight:"bold"}}>update</Text>
                    </TouchableOpacity>
                    )
          
                      :
                     ( <TouchableOpacity style={[styles.create, {backgroundColor:props.itemActive.color}]} onPress={()=>createNoteMultie()}>
                      <Text style={{color: "#fff", fontWeight:"bold"}}>create</Text>

                      </TouchableOpacity>)
        
        }
          </View>
         <View style={styles.profilePhotoContainer}>
          {notePhoto ? (
            <Image style={styles.profilePhoto} source={{ uri: notePhoto }} />
          ) : (
            <View style={styles.defaultPhoto}>
              <AntDesign name="plus" size={27} color="grey" />
            </View>
          )}
          </View>
          
          {/* <View style={styles.profilePhotoContainer}>
          {images!=null ? (
            <Image style={styles.profilePhoto} source={{ uri: images }} />
          ) : (
            <View style={styles.defaultPhotoU}>
              <Text style={{fontSize: 10, color: "#fff"}}>No images</Text>
            </View>
          )}
          </View> */}
          
          {/* <View style={styles.profilePhotoContainer}>
          {images!=null ? (
            <Image style={styles.profilePhoto} source={{ uri: images[0].url }} />
          ) : (
            <View style={styles.defaultPhoto}>
              <AntDesign name="plus" size={27} color="grey" />
            </View>
          )}
          </View>

          <View style={{flex:1, borderWidth:2, borderColor: "grey"}}>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={item => item.id}
      />
          </View> */}

        <View style={{flex:1,marginBottom: 20}}>
          <FlatList
            
            data={images}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          </View>


          



          
        

         
      </ScrollView>
      
   </KeyboardAvoidingView>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: "#fff",
    
  },
  title :{
    fontSize: 18, 
    fontWeight: "800",
    color: "black",
    alignSelf:"center",
    marginBottom: 16
  },
  input : {
    flex:1,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    
  },
  create:{
    marginTop:24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",

  },
  colorSlect: {
      width: 30,
      height: 30,
      borderRadius: 5,

  },
  scrollView:{
    alignSelf:"stretch",
    marginHorizontal: 12,
    backgroundColor: "#fff",
    height: 620,
    width: 300,
    borderRadius: 6,
    marginRight: 70
  },
   buttondate : {
    justifyContent: "center", 
    alignItems: "center",
    height: 50,
    width: 220,
    borderRadius: 12,
    marginRight: 50,
    marginTop: 15,
    
    
  },
  buttontime : {
    justifyContent: "center", 
    alignItems: "center",
    height: 50,
    width: 100,
    borderRadius: 12,
    marginTop: 15,
    marginRight: 20
    
  },
  camera: {
    alignItems: "flex-end"
  },
  profilePhotoContainer: {
    backgroundColor: '#e1e2e6',
    width: 75,
    height: 75,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 12,
    overflow: 'hidden',
   
  
  },
  profilePhotoContainers: {
    backgroundColor: '#e1e2e6',
    width: 120,
    height: 160,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 12,
    overflow: 'hidden',
    shadowRadius:20,
    shadowColor:"#000",
    shadowOpacity:1,
    marginHorizontal: 10
  },
  defaultPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  defaultPhotoU: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profilePhoto: {
    flex: 1,
    borderWidth:2,
    borderColor: '#ddccff'
    
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
 

  
 
});


export default AddNoteModal






