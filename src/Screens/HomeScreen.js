import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator, SafeAreaView, Modal} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
//import { Avatar} from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, Body, Avatar } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import AddEventModal from '../Components/AddEventModal'
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

  const [list, setList] = useState([])

  
  const  firebaseoj = React.useContext(FirebaseContext);
  const [_, setUser] = React.useContext(UserContext);




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
                      // obj.name = (item.name)
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


  
//  const addList = () => {
//    const _iduser = _.uid
//    firebase.firestore().collection("events").add({
//     id: "7",
//     userid: _iduser,
//     date: "2020-11-30",
//     name: "to do 7",
//     color: "red"
//    })
//  }

  

  const getDay = new Date();
  const currenrDay =   getDay.getDate();
  const currenrMoth = getDay.getMonth()+1;
  const currenrYear =  getDay.getFullYear();
  const fulldate = currenrYear+"-"+currenrMoth+"-"+currenrDay;
  


  const tonggleAddEvent =()=>{
    setAddEvent(!addEvent)
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

  const renderItem = (item) => {
    return (

      
       <Content padder>
         
          <Card style={{borderRadius: 10, marginBottom:-9, height:80}}>
            <CardItem style={{height: 80,borderRadius: 10, backgroundColor: item.color    }} button >
            <Body>
              <Text style={{marginBottom:10, fontSize:10, fontWeight:'bold', color: 'white'}}>{item.name}</Text>
              <Text style={{fontSize:10, color: 'white'}}>{items.uid}</Text>
      


              
            </Body>
              
          
            </CardItem>
          </Card>
        </Content>

      
    );
  };



 
  return (
  <SafeAreaView style={{flex:1}}>
    
    <Modal animationType="slide" visible={addEvent} onRequestClose={()=>tonggleAddEvent()}>
    
      <AddEventModal closeModal={()=>tonggleAddEvent()} />
    </Modal>
     <View style={{backgroundColor:"#f0f5f5", height:35}}>
        <TouchableOpacity style={{backgroundColor:"#694fad", height:30, width:30, alignItems:"center", justifyContent:"center",
      marginLeft:180, marginTop:5, borderRadius:30, borderWidth:2, borderColor:"#fff"}} 
      onPress={()=>tonggleAddEvent()}>
          <Text style={{color:"#fff", fontWeight:"bold", alignItems:"center"}}>+</Text>
        </TouchableOpacity>

    </View>
    
   
      <Agenda
       items={items}
    
        loadItemsForMonth={loadItems}
        //onDayPress={(day)=>{console.log('day pressed')}}


        selected={fulldate}
        renderItem={renderItem}

        markedDates={{
           fulldate: {selected: true, marked: true},
        }}
        //refreshing={true}
        theme={{
        
          agendaDayTextColor: '#6666ff',
          agendaDayNumColor: '#6666ff',
          agendaTodayColor: '#ff9933',
          agendaKnobColor: '#ff9933'
        }}
         style={{backgroundColor:'yellow'}}
      
      />

</SafeAreaView>
    
  );
}



