import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Modal, KeyboardAvoidingView , TouchableOpacity, TextInput, ScrollView, Platform, Button} from 'react-native';
import {AntDesign} from "@expo/vector-icons"
//import dataref from '../tempData'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import firebase from 'firebase';
import "firebase/firestore";

//
import {FirebaseContext} from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';

const AddEventModal = (props) => {

  const backgroundColors = ["#00b3b3","#24a6d9","#595bd9", "#8022d9", "#d159d8", "#d85963", "#e6ac00"]

  const [name, setName] = React.useState("")
  const [color, setColor] = React.useState(backgroundColors[0])
  const [_, setUser] = React.useContext(UserContext);




  ///handle add events react native
   const addList = () => {
   const _iduser = _.uid
   firebase.firestore().collection("events").add({
    id: "7",
    userid: _iduser,
    date: "2020-11-30",
    name: name,
    color: color
   })
   props.closeModal()
 }



  
///

  const [isShow, setIsShow] = useState(false);
  const [isShowTime, setIsShowTime] = useState(false);
  const [isShowEnd, setIsShowEnd] = useState(false);
  const [isShowTimeEnd, setIsShowTimeEnd] = useState(false);

  const [dateStart, setDateStart] = useState("Select day")
  const [dateEnd, setDateEnd] = useState("date end")

  const [timeStart, setTimeStart] = useState("00:00")
  const [timeEnd, setTimeEnd] = useState("00:00")
  


 //----date start
  const showDateStart = () => {
    setIsShow(true);
  };
 
  const hideDateStart = () => {
    setIsShow(false);
  };
 
  const handleConfirm = (date) => {
    hideDateStart();
    setDateStart(moment(date).format('YYYY-MM-DD'))//'MMMM, Do YYYY HH:mm'

  };
///-----date end
const showDateEnd = () => {
    setIsShowEnd(true);
  };
 
  const hideDateEnd = () => {
    setIsShowEnd(false);
  };
 
  const handleConfirmDateEnd = (date) => {
    hideDateEnd();
    setDateEnd(moment(date).format('YYYY-MM-DD'))//'MMMM, Do YYYY HH:mm'

  };


//----TIme start
 const showTimeStart = () => {
        setIsShowTime(true);
      };
 
  const hideTimeStart = () => {
    setIsShowTime(false);
  };
   const handleConfirmTime = (time) => {
    hideTimeStart();
    setTimeStart(moment(time).format('HH:mm'))//'MMMM, Do YYYY HH:mm'

  };

//---time end

 const showTimeEnd = () => {
        setIsShowTimeEnd(true);
      };
 
  const hideTimeEnd = () => {
    setIsShowTimeEnd(false);
  };
   const handleConfirmTimeEnd = (time) => {
    hideTimeEnd();
    setTimeEnd(moment(time).format('HH:mm'))//'MMMM, Do YYYY HH:mm'

  };


  
 
  
    
    
     





  

 const renderColors= () =>{
    return backgroundColors.map(color => {
      return(
        <TouchableOpacity key={color} style={[styles.colorSlect, {backgroundColor: color}]}
        onPress ={()=>{setColor(color)}}
        ><Text></Text></TouchableOpacity>
      );
    })
  }

  

 const CreatEvent = () => {

   dataref.push({
    id: '5',
    uid: '01',
    date: "2020-11-26",
     name,
     color,
   })

   setName("")
   props.closeModal()
 }

  return (
  
   <KeyboardAvoidingView style={styles.container} behavior="padding">
   
      <TouchableOpacity style={{position:"absolute", top: 30, right:5, backgroundColor:"#694fad", borderRadius:28, width: 28, height:           30, alignItems:"center", justifyContent:"center"}} onPress={props.closeModal}>
        <AntDesign name="close" size ={20} color="#fff"  />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>

          <Text style={styles.title}>Creat new event</Text>
          <TextInput style={styles.input}
          onChangeText = {name => setName(name.trim())}
        
          placeholder="Add new title" />


      <View style={{ marginTop: 10, borderRadius: 6, height: 150}}> 
          <View style={{flexDirection: "row"}}>
              <TouchableOpacity onPress={showDateStart} style={[styles.buttondate,{backgroundColor: color}]}> 
                  <Text style={{ color: "#fff"}}>{dateStart}</Text>
              </TouchableOpacity>  
          </View>

          <View style={{flexDirection: "row"}}>
              <TouchableOpacity style={[styles.buttontime,{backgroundColor: color}]} onPress={showTimeStart}>
                <Text style={{ color: "#fff"}}>
                  {timeStart}
                </Text> 
              </TouchableOpacity>  

              <TouchableOpacity style={[styles.buttontime,{backgroundColor: color}]} onPress={showTimeEnd}>
                <Text style={{ color: "#fff"}}>
                  {timeEnd}
                </Text> 
              </TouchableOpacity>  
            
          </View>

          <DateTimePickerModal
            isVisible={isShow}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDateStart}
          />

          <DateTimePickerModal
            isVisible={isShowTime}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimeStart}
          />

          <DateTimePickerModal
            isVisible={isShowEnd}
            mode="date"
            onConfirm={handleConfirmDateEnd}
            onCancel={hideDateEnd}
          />

          <DateTimePickerModal
            isVisible={isShowTimeEnd}
            mode="time"
            onConfirm={handleConfirmTimeEnd}
            onCancel={hideTimeEnd}
          />       
        </View>

              
          <View style={{flexDirection: "row", justifyContent:"space-between",marginTop: 12}}>
                {renderColors()}
          </View>
            
          <TouchableOpacity style={[styles.create, {backgroundColor: color}]} onPress={()=>addList()}>
            <Text style={{fontWeight:"600", color: "#fff"}}>
              create
            </Text> 
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
    fontSize: 20, 
    fontWeight: "800",
    color: "black",
    alignSelf:"center",
    marginBottom: 16


  },
  input : {
    borderWidth: 2,
    borderColor: "#ccb3ff",
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
    
  }

  
 
});


export default AddEventModal






