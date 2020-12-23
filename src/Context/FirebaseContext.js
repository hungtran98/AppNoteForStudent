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

    //  const idrandom = "User" + Math.random().toString().substr(2,8)

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

// upload image for note event




////----------------------------create and update note------------------

createNote: async (note) => {
  try {
    //await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
   const uid = Firebase.getCurrentUser().uid;



  //  const idrandom = "User" + Math.random().toString().substr(2,8)
  
    let notePhotoUrl = "default";
  //  let test = []
    await db.collection('Notes').doc(note.idevent).set({
      id: note.idrandom,
      idevent: note.idevent,
      content: note.content,
      notePhotoUrl
    })
    

    
    if(note.notePhoto) {
      notePhotoUrl = await Firebase.uploadProfilePhotoNote(note.notePhoto, note.idevent);
       

    }


   // delete note.password;
  //  return {...note, profilePhotoUrl, uid};
  return {...note, notePhotoUrl};
  }
  catch(error){
    console.log("Error @creatNote: ", error.message);

  }
},




uploadProfilePhotoNote: async (uri,idev) => {
  const uid = Firebase.getCurrentUser().uid;


  try{

      const photo = await Firebase.getBlob(uri);
      const imageRef = firebase.storage().ref('notePhotos').child(idev);
    
      await imageRef.put(photo);


      const url = await imageRef.getDownloadURL();

      await db.collection("Notes").doc(idev).update({
        notePhotoUrl: url,
      })
      return url;
    
     } catch(error){
    console.log("Error @uploadProfilePhotoNote: ", error);
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

updatenote: async (note) => {
  try {
    //await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
   const uid = Firebase.getCurrentUser().uid;



  //  const idrandom = "User" + Math.random().toString().substr(2,8)
  
    //let notePhotoUrl = "default";
  //  let test = []
    await db.collection('Notes').doc(note.idevent).update({
      idevent: note.idevent,
      content: note.content,
    })
    

    
    if(note.notePhoto) {
      notePhotoUrl = await Firebase.updateProfilePhotoNote(note.notePhoto, note.idevent);
       

    }


   // delete note.password;
  //  return {...note, profilePhotoUrl, uid};
  return {...note, notePhotoUrl};
  }
  catch(error){
    console.log("Error @creatNote: ", error.message);

  }
},



updateProfilePhotoNote: async (uri,idev) => {
  const uid = Firebase.getCurrentUser().uid;


  try{

      const photo = await Firebase.getBlob(uri);
      const imageRef = firebase.storage().ref('notePhotos').child(idev);
    
      await imageRef.put(photo);


      const url = await imageRef.getDownloadURL();

      await db.collection("Notes").doc(idev).update({
        notePhotoUrl: url,
      })
      return url;
    
     } catch(error){
    console.log("Error @uploadProfilePhotoNote: ", error);
  }
}
,



//----------create and update multie images-------------------

createNoteMultie: async (note) => {
  try {
    const uid = Firebase.getCurrentUser().uid;

    let notePhotoUrl = [];
    await db.collection('notes').doc(note.idevent).set({
      id: note.idrandom,
      idevent: note.idevent,
      idsubject: note.idsubject,
      date: note.date,
      content: note.content,
      notePhotoUrl
    })
    

    
    if(note.notePhoto) {
      notePhotoUrl = await Firebase.uploadProfilePhotoNoteMultie(note.notePhoto, note.idevent, note.countimage);
       

    }

  return {...note, notePhotoUrl};
  }
  catch(error){
    console.log("Error @creatNote: ", error.message);

  }
},




uploadProfilePhotoNoteMultie: async (uri,idev, count) => {
  const uid = Firebase.getCurrentUser().uid;

  try{
      const idrandom = Math.random().toString().substr(2,8)

      const photo = await Firebase.getBlob(uri);
      const imageRef = firebase.storage().ref('noteMultiePhoto').child(idev+'/'+idrandom);
    
      await imageRef.put(photo);


      const url = await imageRef.getDownloadURL();

      await db.collection("notes").doc(idev).update({
        notePhotoUrl: [{id:idrandom,url}]
      })
      return url;
    
     } catch(error){
    console.log("Error @uploadProfilePhotoNote: ", error);
  }
}



,


// updateNoteMultie: async (note) => {
//   try {

//     const uid = Firebase.getCurrentUser().uid;
    
//     if(note.notePhoto) {
//      const url = await Firebase.updateProfilePhotoNoteMultie(note.notePhoto, note.idevent, note.countimage);
//      var newPhotoUrl = url
     
//   }
// //console.log(newPhotoUrl,"dasg")
// let newPhoto = []
// if(newPhotoUrl){
//   newPhoto = [...note.images, {url:newPhotoUrl}]

// } else {
//   newPhoto = [...note.images]
// }
//     await db.collection('notes').doc(note.idevent).update({
//       idevent: note.idevent,
//       content: note.content,
//       notePhotoUrl:  newPhoto
//     })


//   return {...note, notePhotoUrl};
//   }
//   catch(error){
//     console.log("Error @creatNote: ", error.message);

//   }
// },


updateNoteMultie: async (note) => {
  try {
    const uid = Firebase.getCurrentUser().uid;

    await db.collection('notes').doc(note.idevent).update({
      
      idevent: note.idevent,
      content: note.content,
    
    })
    

    
    if(note.notePhoto) {
      notePhotoUrl = await Firebase.updateProfilePhotoNoteMultie(note.notePhoto, note.idevent, note.countimage, note.images);
       
    //  console.log(note.images,"dasgs")

    }

  return {...note, notePhotoUrl};
  }
  catch(error){
    console.log("Error @creatNote: ", error.message);

  }
},






updateProfilePhotoNoteMultie: async (uri, idev, count, img) => {
  const uid = Firebase.getCurrentUser().uid;


  try{
       const idrandom = Math.random().toString().substr(2,8)

      const photo = await Firebase.getBlob(uri);
      const imageRef = firebase.storage().ref('noteMultiePhoto').child(idev+'/'+idrandom);
    
      await imageRef.put(photo);


      const url = await imageRef.getDownloadURL();
    
      await db.collection("notes").doc(idev).update({
        notePhotoUrl: [...img,{id:idrandom,url:url}]
        
      })
      return url;
    
     } catch(error){
    console.log("Error @uploadProfilePhotoNote: ", error);
  }
}
,



//------------------------///--------------------------------

  
  


  

  



};



const FirebaseProvider =  (props) => {
  return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>;

}

export {FirebaseContext, FirebaseProvider};






