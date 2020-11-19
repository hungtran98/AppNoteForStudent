import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
//import { Avatar} from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, Body, Avatar } from "native-base";
import dataref from "../../tempData";

//
import {FirebaseContext} from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';

//chuyen doi time sang string: 2020-11-20
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};


export default function HomeScreen ({navigation}) {
  const [items, setItems] = useState(
    // uid: "sfjakjhkdnsbnb",
    // '2020-11-13': [{name: 'Billie Erilish', color: "#5cd859"}],
    // '2020-11-14': [{name: 'Annie Marie', height: 80, color: '#24a69d'}],
    // '2020-11-15': [],
    // '2020-11-16': [{name: 'Justin Bibier', color:"#595bd9"}, {name: 'Selena Gomez', color:"#8022d9"}],
    // '2020-11-17': [{name: 'Dj Snake', color: "#d85963"}],

dataref
);

 const [result, setResult] = useState(null);

// const data = [

//   {
//       id: '1',
//       uid: '01',
//       date: "2020-11-18",
//       name: "to do 1",
//       color:"#5cd859"
//   },
//   {
//     id: '4',
//     uid: '01',
//     date: "2020-11-20",
//     name: "to do 45",
//     color:"#d85963"
// },]

const  firebaseoj = React.useContext(FirebaseContext);
const [_, setUser] = React.useContext(UserContext);


// useEffect( async ()=> {


  
//     const userid = _.uid;
//     const listEvents = await  firebaseoj.getEvents(userid);
//     //console.log(listEvents);
    
//   }

// ,[]); 








//listEvents[
          // dayEvents: [{ title },{ color },{ time }...,{}], 
          // dayEvents: [{},{},{}...,{}],  
          // dayEvents: [{},{},{}...,{}],
// ]  
  const getDay = new Date();
  const currenrDay =   getDay.getDate();
  const currenrMoth = getDay.getMonth()+1;
  const currenrYear =  getDay.getFullYear();
  const fulldate = currenrYear+"-"+currenrMoth+"-"+currenrDay;
  

  
 

  
  // const loadItems = (day) => {
  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);
  //       if (!items[strTime]) {
  //         items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: 'WorkShop in Ichita: ' + strTime + ' #' + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //           });
  //         }
  //       }
  //     }
  //     const newItems = {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 1000);
  // };
  
  const loadItems = (day) => {
    console.log(day);

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
            

        
        if (!items[strTime]) {
          items[strTime] = [];
         

          //----dung de render random list item
          //tra ve so N tu 1-2
          // const numItems = Math.floor(Math.random() * 2 + 1);
          // for (let j = 0; j < numItems; j++) {
          //   items[strTime].push({
          //     name: 'WorkShop in Ichita: ' + strTime + ' #' + j,
          //     height: Math.max(50, Math.floor(Math.random() * 150)),
          //     today: strTime,
          //   });
            
          // }
          //--------
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
      // <TouchableOpacity style={{marginRight: 10, marginTop: 17, }} onPress={()=>{alert("pressed")}}>
      
        // <Card>
        //   <Card.Content>
            // <View
              // style={{
              //   flexDirection: 'row',
              //   justifyContent: 'space-between',
              //   alignItems: 'center',
              //   borderWidth: 2
                
              // }}>
            //    <Text style={{marginBottom:20}}>{item.name}</Text>
              
            //   <Avatar.Text style={{width:40, height: 40}} />
            // </View>
        //   </Card.Content>
        // </Card>
       <Content padder>
          <Card style={{borderRadius: 10, marginBottom:-9, height:80}}>
            <CardItem style={{height: 80,borderRadius: 10, backgroundColor: item.color    }} button onPress={() => alert(items.uid)}>
            <Body>
              <Text style={{marginBottom:10, fontSize:10, fontWeight:'bold', color: 'white'}}>{item.name}</Text>
              <Text style={{fontSize:10, color: 'white'}}>{items.uid}</Text>
      

              
            </Body>
              
          
            </CardItem>
          </Card>
        </Content>
     // </TouchableOpacity>
  //     </View>
  // </View>
    );
  };

  return (
    
    <View style={{flex: 1}}>
      <Agenda
       items={items}
    
        loadItemsForMonth={loadItems}
          onDayPress={(day)=>{console.log('day pressed')}}


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
  </View>
    
  );
}



