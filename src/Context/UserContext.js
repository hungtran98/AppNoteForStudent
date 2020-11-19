import React,{ useState} from 'react';
import {Text} from 'react-native';

const UserContext = React.createContext([{}, () => {}]);
const UserProvider = (props) => {
  const [state, setState] = useState ({
    username: "",
    email: "",
    uid: "",
    isLoggedIn: null,
    profilePhotoUrl: "default",
   
  });

  return(
      <UserContext.Provider value = {[state,setState]}>{props.children}</UserContext.Provider>
  ); 
}


export { UserContext, UserProvider };
export const UserConsumer = UserContext.Consumer;