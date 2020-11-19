import {useContext} from 'react';
import {UserContext} from '../Context/UserContext';
import {FirebaseContext} from '../Context/FirebaseContext';



const useUser = () => {
  const [state, setState] = useContext(UserContext);
  const  firebase = useContext(FirebaseContext);


  const SignUp = async () => {
    
    setState(state=>({ ...state, setLoading: true}));
    
       //   setLoading(true);

     //const user = { username, email, password, profilePhoto  };
//user = {state.username, state.email, state.password, state.profilePhoto};

          try {
            const createdUser = await firebase.createUser(user);
            setState(state=>({...state, isLoggedIn: true}));

          }
          catch(error){
            console.log("Error @sigUp: ", error );

          }finally {
           setState(state=>({ ...state, setLoading: true}));
          }
      
  }
  
  

  

  return {


  }

}


export default useUser;