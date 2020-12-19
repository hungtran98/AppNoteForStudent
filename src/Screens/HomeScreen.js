import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator, SafeAreaView, Modal, Animated} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
//import { Avatar} from 'react-native-paper';
import { Container, Header, Content, Card, SwipeRow, CardItem, Body, Button, Avatar, Icon } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import AddEventModal from '../Components/AddEventModal'
import AddNoteModal from '../Components/Addnote'
import {Swipeable} from 'react-native-gesture-handler'
 


//import dataref from "../../tempData";
import firebase from 'firebase';
import "firebase/firestore";

//
import {FirebaseContext} from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';

//chuyen doi time sang string: 2020-11-20
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};


export default function HomeScreen ({navigation}) {
  const [items, setItems] = useState({});

  const [addEvent, setAddEvent] = useState(false);
  //const [updateEvent, setUpdateEvent] = useState(false)
  
   
  const [isTime, setIsTime] = useState(currentTime)

  const [list, setList] = useState([])

  
  const  firebaseoj = React.useContext(FirebaseContext);
  const [_, setUser] = React.useContext(UserContext);

  useEffect(()=>{
    setTimeout(async () => {
      const _iduser = _.uid
    firebase.firestore().collection("events").where("userid", "==",_iduser).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if(timealarm==timestart)
          alert("da den gio lam nhiem nhiem vu")
      });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    },300)},[])

useEffect(()=>{
  setTimeout(async () => {
    const _iduser = _.uid
    firebase.firestore().collection("events").where("userid", "==",_iduser)
    .onSnapshot(function(querySnapshot)  {
        var listEvents = [];
        querySnapshot.forEach(function(doc) {
            listEvents.push({ id:doc.id,...doc.data()} )
        });
      
      
       // return listEvents convert [] to {}

        var data = listEvents;
          let items1
          let dates = []
          let arrayDate = []
          
          


          data.forEach(item => {
              dates.push(item.date)
          })

          dates.map(d => {
              let arrayName = []
              
              data.map(item => {
                  if (item.date === d) {
                      
                      
                      let objsDate={}
                      objsDate.name = (item.name)
                      objsDate.color = (item.color)
                      objsDate.date= (item.date)
                      objsDate.id= (item.id)
                      objsDate.timestart = (item.timestart)
                      objsDate.timeend = (item.timeend)
                      objsDate.idsubject = (item.idsubject)
                      arrayName.push(objsDate)

                      arrayDate[d] = arrayName
                  }
              })
          })
          items1 = { uid: _iduser, ...arrayDate }

      
          setItems(items1)


          
         // setLoading(false)
            
    });
  },500)},[])

  

    


 


  

const getDay = new Date();
const currenrDay =   '0'+getDay.getDate();
const currenrMoth = getDay.getMonth()+1;
const currenrMoth1 = '0'+currenrMoth
const currenrYear =  getDay.getFullYear();
const fulldate = currenrYear+"-"+currenrMoth1.slice(currenrMoth1.length-2)+"-"+currenrDay.slice(currenrDay.length-2);

const currentHour = '0'+getDay.getHours();
const currentMi ='0'+getDay.getMinutes();
    
const currentTime = currentHour.slice(currentHour.length-2) +":"+currentMi.slice(currentMi.length-2);
    

  const tonggleAddEvent =()=>{
    setAddEvent(!addEvent)
  }
 

  const [addNote, setAddNote] = useState(false)
  
  const tonggleNote =()=>{
    setAddNote(!addNote)
   
  }

  
 
 

  
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];   
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
  

  const [itemActive, setitemActive] = useState('')
  const tonggleAddNote = (item) => {
    setitemActive(item)
    tonggleNote()
  }

  

  const renderItem = (item) => {
    const list = item.items

    return (

      <View>
          <Modal animationType="slide" visible={addNote} onRequestClose={()=>tonggleAddNote()}>
            <AddNoteModal closeModals={()=>tonggleAddNote()} list = {items} itemActive = {itemActive} />
          </Modal>

          <TouchableOpacity style={{marginTop: 15, }} >
          <Swipeable  renderRightActions={rightAction}>
          <Card style={{ marginBottom:-9, height:70, borderTopRightRadius: 10}}>
            <CardItem style={{height: 70 ,  backgroundColor: item.color,  borderTopRightRadius: 10}} button onPress={()=>tonggleAddNote(item)}>
            <Body>
              <Text style={{marginBottom:10, fontSize:10, fontWeight:'bold', color: 'white'}}>{item.name}</Text>
    <Text style={{fontSize:10, color: 'white'}}>{item.timestart}-{item.timeend}</Text>
            </Body>
                  
            </CardItem>
          </Card>
          </Swipeable>
          </TouchableOpacity>
       

        
      </View>
      
    );
  };


  const rightAction = (progress, dragX) =>{
    const scale = dragX.interpolate({
        inputRange: [-100,0],
        outputRange: [1,0], 
        extrapolate: "clamp"
    })
    return(
      <TouchableOpacity style={{height: 60, marginTop: 5, marginRight: 5, borderLeftWidth:8, borderLeftColor:"red"}}>
        <Animated.View style={{flex:1, backgroundColor: "red", justifyContent:"center", alignItems:"center", width:120, height:40
,borderTopRightRadius: 10}}>
        <AntDesign name="delete" size={22} color="#fff" />
       
        </Animated.View>
      </TouchableOpacity>
    )
  } 



 
  return (
  <SafeAreaView style={{flex:1, position: "relative"}}>
    
    <Modal animationType="slide" visible={addEvent} onRequestClose={()=>tonggleAddEvent()}>
    
      <AddEventModal closeModal={()=>tonggleAddEvent()} />
    </Modal>
    <View style={{backgroundColor:"#fff", position:"absolute",  height: 55, width: 55,  marginLeft:300, marginTop:540,  borderRadius:30}}>
    <TouchableOpacity style={{backgroundColor:"#fff",shadowColor: '#ccd9ff', height:55, width:55, alignItems:"center", justifyContent:"center",
      borderRadius:30, borderWidth:5, borderBottomColor:"#0099cc", borderLeftColor: "#00ff80", borderRightColor:"#ff1a1a",
    borderTopColor:"#ffcc00"}} 
      onPress={()=>tonggleAddEvent()}>
                  <AntDesign name="plus" size ={35} color="#694fad"  />

        </TouchableOpacity>

    </View>
    
   
    <View style={{flex: 1, zIndex: -1}}>

      <Agenda
       items={items}
    
        loadItemsForMonth={loadItems}
        //onDayPress={(day)=>{console.log('day pressed')}}


        selected={fulldate}
        renderItem={renderItem}

        markedDates={
        //   {
        //    fulldate: {selected: true, marked: true},
        // }
        items
      }
        //refreshing={true}
        theme={{
          agendaDayTextColor: '#6666ff',
          agendaDayNumColor: '#6666ff',
          agendaTodayColor: '#ff9933',
          agendaKnobColor: '#ff9933',
          
        }}
         style={{backgroundColor:'yellow'}}
        // onRefresh={() => setItems(items)}
      />

    </View>

</SafeAreaView>
    
  );
}





