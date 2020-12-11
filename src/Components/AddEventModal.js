import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Switch, Modal, KeyboardAvoidingView , TouchableOpacity, TextInput, ScrollView, Platform, Button} from 'react-native';
import {AntDesign} from "@expo/vector-icons"
//import dataref from '../tempData'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import {  Icon } from "native-base";


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
//    const addList = () => {
//    const _iduser = _.uid
//    const idrandom = "Ev" + Math.random().toString().substr(2,8)
//    firebase.firestore().collection("events").add({
//     id: idrandom,
//     userid: _iduser,
//     date: dateStart,
//     timestart: timeStart,
//     timeend: timeEnd,
//     name: name,
//     color: color
//    })
//    props.closeModal()
//  }

const addList = () => {
  const _iduser = _.uid
  const idrandom = "Ev" + Math.random().toString().substr(2,8)
  firebase.firestore().collection("events").doc(idrandom).set({
   id: idrandom,
   userid: _iduser,
   date: dateStart,
   timestart: timeStart,
   timeend: timeEnd,
   name: name,
   color: color,
   timealarm: timeAlarm,
   alarmlock: isEnabled
  })
  props.closeModal()
}





  
///

  const [isShow, setIsShow] = useState(false);
  const [isShowTime, setIsShowTime] = useState(false);
  const [isShowEnd, setIsShowEnd] = useState(false);
  const [isShowTimeEnd, setIsShowTimeEnd] = useState(false);


  const [isShowTimeAlarm, setIsShowTimeAlarm] = useState(false);

  const [dateStart, setDateStart] = useState("Select day")
  const [dateEnd, setDateEnd] = useState("date end")

  const [timeStart, setTimeStart] = useState("00:00")
  const [timeEnd, setTimeEnd] = useState("00:00")

  const [timeAlarm, setTimeAlarm] = useState("00:00")

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);
  

  //--time alarm
  const showTimeAlarm = () => {
    setIsShowTimeAlarm(true);
  };

const hideTimeAlarm = () => {
setIsShowTimeAlarm(false);
};
const handleConfirmTimeAlarm = (time) => {
  hideTimeAlarm()
setTimeAlarm(moment(time).format('HH:mm'))//'MMMM, Do YYYY HH:mm'
    
};

  


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
   
      <TouchableOpacity style={{position:"absolute", top: 30, right:5, backgroundColor:"#694fad", borderRadius:28, width: 30, height: 30, alignItems:"center", justifyContent:"center"}} onPress={props.closeModal}>
        <AntDesign name="close" size ={20} color="#fff"  />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>

          <Text style={styles.title}>Creat new event</Text>
          <TextInput style={styles.input}
         // onChangeText = {name => setName(name.trim())}
         onChangeText = {name => setName(name)}
         placeholder="Add title" 
        />


      <View style={{ marginTop: 10, borderRadius: 6, height: 150, borderTopColor: "#85a3e0"}}> 
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
           <DateTimePickerModal
            isVisible={isShowTimeAlarm}
            mode="time"
            onConfirm={handleConfirmTimeAlarm}
            onCancel={hideTimeAlarm}
          />    
        </View>
        
        
        <View style={{marginTop: 10, marginLeft: -100 , paddingTop:10, borderTopWidth: 2,borderTopColor: "#85a3e0", flexDirection: "row", justifyContent: "center", alignItems:"center"}} >
        <Icon name='alarm' style={{marginRight:5, color: "#3973ac" }}  />
        <TouchableOpacity style={[styles.buttonalarm,{backgroundColor: color}]} onPress={showTimeAlarm}>
                <Text style={{ color: "#fff"}}>
                  {timeAlarm}
                </Text> 
        </TouchableOpacity>  
            <Switch
              trackColor={{ false: "#767577", true: "#3973ac" }}
              thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

              
          <View style={{flexDirection: "row", justifyContent:"space-between",marginTop: 12 ,  paddingTop:10, borderTopWidth: 2, borderTopColor: "#85a3e0"}}>
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
    borderBottomWidth: 1,
    borderColor: "#85a3e0",
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
  buttonalarm : {
    justifyContent: "center", 
    alignItems: "center",
    height: 40,
    width: 100,
    borderRadius: 12,
  
    marginRight: 20
    
  }


  
 
});


export default AddEventModal






