import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthValue = (props)=>{
    const [isAuthorized , setAuth] = useState(false);
    const [userToken , setToken] = useState( localStorage.getItem("token") ? localStorage.getItem("token") : "" );
    const [location , setLocation] = useState('');
    const [userID , setUserID] = useState();
    console.log(userID);
    const navigate = useNavigate();

    console.log("userToken" , userToken);
    const decoded =  userToken ?  jwtDecode(userToken) : null;
    console.log("decoded " , decoded);
    

    // function to show success toast
    const toastfn = (data)=>toast.success(data ,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"})
    // fucntion to show error toast
    const errortoastfn = (data)=>toast.error(data ,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"})

    // function to redirect the unathaurised user to login page 
    const CheckAuthentication =(path)=>{
        
        if(!isAuthorized){
            setLocation(path);
            // toastfn("Please log in to your account.");
            navigate('/signin');

        }
    } 

    useEffect(()=>{
        console.log("userToken " , userToken);
        if(userToken){
            setAuth(true);
            setUserID(decoded.userInfo.id.toString());
        }
    },[]);
    
    return <AuthContext.Provider value={{isAuthorized , userID , setAuth , userToken , setToken , location , setLocation , CheckAuthentication , toastfn , errortoastfn}} > {props.children} </AuthContext.Provider>
}

// custom hook
const useAuthContext = ()=> useContext(AuthContext);

export default AuthValue;
export {useAuthContext , AuthContext};