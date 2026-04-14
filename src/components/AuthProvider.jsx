import { useReducer ,useEffect } from "react";
import UserContext from "../context/UserContext.jsx";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
const userReducer = (state, action) => {
    switch(action.type){
        case "LOGIN" : {
            return {...state, isLoggedIn:true, user: action.payload}
        }
        case "LOGOUT" : {
            return {...state, isLoggedIn: false, user: null}
        }
        case "SET_SERVER_ERRORS": {
            return {...state, serverErrors: action.payload}
        }
        default: {
            return{...state}
        }
    }
}
export default function AuthProvider(props){
    const  Navigate = useNavigate();
    const [userState, dispatch] = useReducer(userReducer, {
        user: null,
        isLoggedIn: false,
        serverErrors:''
    })
  

  const handleRegister = async (FormData, resetForm) => {
    try{
   const response = await axios.post('/user/register', FormData);
   console.log(response.data);
   alert("successfully registered")
   resetForm();
   Navigate('/login')
    }catch(err){
        console.log(err)
    }
  }

const handleLogin = async (FormData, resetForm) => {
    try{
  const response = await axios.post('/user/login', FormData);
  console.log(response.data);
  localStorage.setItem('token', response.data.token);
  const userResponse = await axios.get('/user/account', { headers: {Authorization: localStorage.getItem('token')}})
  alert("successfully Login")
  dispatch({type: "LOGIN"})
  resetForm();
  Navigate('/Dashboard')
    }catch(err){
       dispatch({ type: "SET_SERVER_ERRORS", payload: err.response.data.error});
       console.log(err)
    }
}

const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type : 'LOGOUT'})
}

useEffect(() => {
    if(localStorage.getItem('token')){
        const fecthUser= async () => {
         try{
          const response = await axios.get('/user/account', {headers: {Authorization: localStorage.getItem('token')}})
          dispatch({ type: "LOGIN", payload: response.data})
         }catch(err){
            alert(err.message)
         }
        }
        fecthUser();
    }
},[])

 return (
    <div>
        <UserContext.Provider value={{...userState, handleRegister, handleLogin, handleLogout}}>
        
        {props.children}
        </UserContext.Provider>
    </div>
 )
}