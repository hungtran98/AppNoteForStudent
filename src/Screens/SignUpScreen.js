import React, { useState, useContext } from 'react';
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
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { FirebaseContext} from '../Context/FirebaseContext';
import { UserContext } from '../Context/UserContext';

import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Form,
  Item,
  Label,
  Input,
  Thumbnail,
  Separator,
  ListItem,
} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [email, SetEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const firebaseobj = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

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
        setProfilePhoto(result.uri);
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

  const signUp = async () => {
    setLoading(true);

    const user = { username, email, password, profilePhoto };

    
    try {
      const createdUser = await firebaseobj.createUser(user);

      setUser({ ...createdUser, isLoggedIn: true});

     // console.log(createdUser);

    } catch (error) {
      console.log('Error @signUp: ', error);
    } finally {
      setLoading(false);

    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toppart}>
        <Text style={styles.titleTop}> Sign up to get Started. </Text>

        <TouchableOpacity
          style={styles.profilePhotoContainer}
          onPress={addprofilePhoto}>
          {profilePhoto ? (
            <Image style={styles.profilePhoto} source={{ uri: profilePhoto }} />
          ) : (
            <View style={styles.defaultPhoto}>
              <AntDesign name="plus" size={27} color="grey" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Animatable.View
        style={styles.botpart}
        animation="fadeInUpBig"
        duraton="500">
        <Text style={{ fontWeight: 'bold' }}> User name</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color=" grey" size={20} />
          <TextInput
            placeholder="Example"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(username) => setUsername(username.trim())}
          />
          <Feather name="check-circle" color="green" size={20} />
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Email</Text>
        <View style={styles.action}>
          <Feather name="mail" color="grey" size={20} />

          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(email) => SetEmail(email.trim())}

          />
          <Feather name="eye-off" color="green" size={20} />
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="grey" size={20} />

          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(password) => setPassword(password.trim())}

          />
          <Feather name="eye-off" color="green" size={20} />
        </View>


        <Button
          block
          success
          onPress={signUp}
          style={{
            backgroundColor: '#694fad',
            borderRadius: 30,
            marginTop: 40,
            borderWidth: 3,
            borderColor: '#ccb3ff',
          }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#fff' }}>
            SignUp
          </Text>
        </Button>

        <Button
          block
          success
          onPress={() => navigation.navigate('SignIn')}
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
            marginTop: 10,
            borderWidth: 3,
            borderColor: '#ccb3ff',
          }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#694fad' }}>
            SignIn
          </Text>
        </Button>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#694fad',
  },
  toppart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botpart: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  titleTop: {
    fontSize: 22,

    color: '#fff',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  profilePhotoContainer: {
    backgroundColor: '#e1e2e6',
    width: 75,
    height: 75,
    borderRadius: 80,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
