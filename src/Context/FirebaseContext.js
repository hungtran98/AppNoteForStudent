import React,{ useState, createContext} from 'react';

import firebase from 'firebase';
import  'firebase/auth';
import 'firebase/firestore';

//config firebase
import Config from '../Config/firebase';
import { useIsFocused } from '@react-navigation/native';


const FirebaseContext = React.createContext()

if(!firebase.apps.length) {
  firebase.initializeApp(Config);
}

//creat store
const db = firebase.firestore();

//creat oblect Firebase{...}
const Firebase = {
  getCurrentUser: () => {

    return firebase.auth().currentUser;

  },


  createUser: async (user) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;

      let profilePhotoUrl = "default";
      await db.collection('users').doc(uid).set({
        username: user.username,
        mail: user.email,
        profilePhotoUrl
      })
      
      if(user.profilePhoto) {
        profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
         

      }


      delete user.password;
      return {...user, profilePhotoUrl, uid};
    }
    catch(error){
      console.log("Error @creatUser: ", error.message);

    }
  },




  uploadProfilePhoto: async (uri) => {
    const uid = Firebase.getCurrentUser().uid;


    try{

        const photo = await Firebase.getBlob(uri);
        const imageRef = firebase.storage().ref('profilePhotos').child(uid);
      
        await imageRef.put(photo);


        const url = await imageRef.getDownloadURL();


        await db.collection("users").doc(uid).update({
          profilePhotoUrl: url,
        })
        return url;
      
       } catch(error){
      console.log("Error @uploadProfilePhoto: ", error);
    }
  }
  ,

  getBlob: async (uri) => {
    return await new Promise( (resolve, reject)=> {
      const xhr = new XMLHttpRequest();

      xhr.onload =() =>{
        resolve(xhr.response);
      }

      xhr.onerror = () =>{
        reject( new TypeError("Network  request failed."))

      }

      xhr.responseType = "blob";
      xhr.open("GET",uri, true);
      xhr.send(null);
    });

  },

  signIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  getUserInfo: async (uid) => {
    try{
        const user = await db.collection('users').doc(uid).get();

        if(user.exists){
          return user.data(); 

        }
    }
    catch(error){
      console.log("Error @getUserInfo: ", error);
    }
  },

  logOut: async() => {
    try{
     await firebase.auth().signOut();

     return true;

    } catch(err){
      console.log("Error @logOut: ",error);
    }

    return false;
  },



  


  

  



};



const FirebaseProvider =  (props) => {
  return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>;

}

export {FirebaseContext, FirebaseProvider};






