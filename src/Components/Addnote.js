import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Modal, KeyboardAvoidingView , TouchableOpacity, TextInput, ScrollView, Platform, Button} from 'react-native';
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

import {FirebaseContext} from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';


const AddNoteModal = (props) => {

  


  const [name, setName] = useState(props.itemActive.name)
  const [updateEvent, setUpdateEvent] = useState(false)
  
  const [content, setContent] = useState('...')
  const [notePhoto, setNotePhoto] = useState();
  const [idnote, setIdNote] = useState('')
  const [_, setUser] = React.useContext(UserContext);



  
  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) {
        setNotePhoto(result.uri);
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


  
  const CreateNote = async () => {
    //setLoading(true);
    const idrandom = "Note" + Math.random().toString().substr(2,8)
    setIdNote(idrandom)
    idevent = itemActive.id

    const note = {idevent, idnote, content, notePhoto };

       // console.log(note)
    
    try {
      const creactenote = await firebaseobj.createNote(note);

     // setUser({ ...createdUser, isLoggedIn: true});

     // console.log(createdUser);
     props.closeModals()

    } catch (error) {
      console.log('Error @signUp: ', error);
    } finally {
     // setLoading(false);

    }
  };


  
  
  

  const tonggleEvent =()=>{
    setUpdateEvent(!updateEvent)
  }
  const {itemActive}=props
  const tonggleUpdateEvent = () => {
    tonggleEvent()
  }


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

  <Text style={styles.title}>{itemActive.name}</Text>
         <Form>
            <Textarea style={{borderColor: "#ccb3ff", borderRadius: 6}} rowSpan={12} bordered value={content} onChangeText={(content) => setContent(content.trim())}
/>
          </Form>


         <TouchableOpacity style={styles.camera} >
          <AntDesign name="camera" size={30} color="#476b6b" onPress={()=>addprofilePhoto()}/>
         </TouchableOpacity>

         <View style={styles.profilePhotoContainer}>
          {notePhoto ? (
            <Image style={styles.profilePhoto} source={{ uri: notePhoto }} />
          ) : (
            <View style={styles.defaultPhoto}>
              <AntDesign name="plus" size={27} color="grey" />
            </View>
          )}
          </View>
        

          <TouchableOpacity style={[styles.create, {backgroundColor:props.itemActive.color}]} onPress={()=>CreateNote}>
          
           
            <AntDesign name="plus" size={30} color="#fff"/>

          </TouchableOpacity>
          
    
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
    backgroundColor: "#fff"
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
    borderRadius: 6
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
    width: 100,
    height: 100,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  defaultPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profilePhoto: {
    flex: 1,
  },

  
 
});


export default AddNoteModal






