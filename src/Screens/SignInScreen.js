    import React, {useState} from 'react';
    import { 
        View, 
        Text, 
        TouchableOpacity, 
        Dimensions,
        StyleSheet,
        StatusBar,
        Image,
        TextInput,
        Platform,
        ActivityIndicator
    } from 'react-native';
    import * as Animatable from 'react-native-animatable';

    import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
    import { useTheme } from '@react-navigation/native';
    import { useNavigation } from '@react-navigation/native';
    import FontAwesome from 'react-native-vector-icons/FontAwesome';
    import Feather from 'react-native-vector-icons/Feather';


    import { Container, Header, Body, Title, Content, Button,Icon, Footer, FooterTab, Left,             Right, Form, Item, Label, Input, Thumbnail, Separator, ListItem } 
             from 'native-base';

    import {FirebaseContext} from '../Context/FirebaseContext';
    import {UserContext} from '../Context/UserContext';




    export default function SignInScreen({navigation}){

      const [email, SetEmail] = useState();
      const [password, setPassword] = useState();
      const [loading, setLoading] = useState(false);


      //su dung 2 contex va tao ham signIn()
      const  firebase = React.useContext(FirebaseContext);
      const [_, setUser] = React.useContext(UserContext);


      const signIn = async() =>{
        setLoading(true);

        try{
          await firebase.signIn(email, password);

          const uid = firebase.getCurrentUser().uid;


          const userInfo = await firebase.getUserInfo(uid);
         // console.log(userInfo)


          setUser({
            username: userInfo.username,
            email: userInfo.email,
            uid,
            profilePhotoUrl: userInfo.profilePhotoUrl,
            isLoggedIn: true,
          })

        }catch(error){
          alert(error.message);

        } finally {
          setLoading(false);
        }

      }

      return(
          
          <View style={styles.container}>
            <View style={styles.toppart}>
              <Text style ={styles.titleTop}> Well Come. </Text>
            </View>

            <Animatable.View style={styles.botpart} 
                animation="fadeInUpBig"
                duraton="500">
              <Text style = {{fontWeight: 'bold'}}> Email</Text>
              <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        color='#94b8b8'
                        size={20}
                    />
                    <TextInput 
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style= {styles.textInput}
                        autoCapitalize="none"
                        onChangeText = {email => SetEmail(email.trim())}
                        value = {email}
                    />
                     <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                    
                
              </View>
        
              <Text style = {{fontWeight: 'bold', marginTop: 20}}>Password</Text>
              <View style={styles.action}>
                  <Feather 
                      name="lock"
                      color= '#94b8b8'
                      size={20}
                  />
                
                  <TextInput 
                      placeholder="Your Password"
                      placeholderTextColor="#666666"
                      secureTextEntry= {true}
                      autoCapitalize="none"
                      style= {styles.textInput}
                      onChangeText = {password => setPassword(password.trim())}
                        value = {password}
                     
                      
                  />
                  <Feather 
                          name="eye-off"
                          color="green"
                          size={20}
                      />
              </View>
              
             
                
      
              <Button block success  onPress={signIn}
              style={{backgroundColor:'#694fad',borderRadius: 30, marginTop: 40, borderWidth: 3, borderColor: '#ccb3ff' }}
               >

             
          <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fff'}}>SignIn </Text>  
               
              
              </Button> 

                <Button block success onPress ={()=>navigation.navigate('SignUp')} 
              style={{backgroundColor:'#fff',borderRadius: 30, marginTop: 10, borderWidth: 3, borderColor: '#ccb3ff' }} >
                 <Text style={{fontSize: 17, fontWeight: 'bold', color: '#694fad'}}>SignUp</Text>   
              </Button> 

            </Animatable.View>
          </View>


      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1, 
        backgroundColor: '#694fad'
      },
      toppart: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
         
      },
      botpart: {
          flex: 2,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingVertical: 50,
          paddingHorizontal: 30,
      },
      titleTop: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'

      },
      action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
       // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        
    },
    });

