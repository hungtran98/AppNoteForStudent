
import firebase from 'firebase';
import "firebase/firestore";
import {UserContext} from './src/Context/UserContext';




// const data = [

//     {
//         id: '1',
//         uid: '01',
//         date: "2020-11-19",
//         name: "to do 1",
//         color:"#5cd859"
//     },
//     {
//         id: '2',
//         uid: '01',
//         date: "2020-11-19",
//         name: "to do 2",
//         color:"#24a69d"
//     },
//      {
//         id: '3',
//         uid: '01',
//         date: "2020-11-19",
//         name: "to do 3",
//         color:"#595bd9"
        
//     },
//     {
//         id: '4',
//         uid: '01',
//         date: "2020-11-21",
//         name: "to do 45",
//         color:"#d85963"
//     },


//  ];

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

   
    let items
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
    items = { uid: data[0].uid, ...arrayDate }
   // console.log('itemss laxx:', items)
// const dataref = 
//   {
//     uid: "sfjakjhkdnsbnb",
//     '2020-11-13': [{name: 'Billie Erilish', color: "#5cd859"}],
//     '2020-11-14': [{name: 'Annie Marie', height: 80, color: '#24a69d'}],
//     '2020-11-15': [],
//     '2020-11-16': [{name: 'Justin Bibier', color:"#595bd9"}, {name: 'Selena Gomez', color:"#8022d9"}],
//     '2020-11-17': [{name: 'Dj Snake', color: "#d85963"}],

//}

//console.log("dataref la:",dataref);
export default items;

