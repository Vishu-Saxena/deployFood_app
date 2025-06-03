import React, { useState } from 'react'
import '../style/signin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Signin = () => {
  const [user , setUser] = useState({});
  const navigate = useNavigate();
  const {setToken , setAuth , location ,toastfn , errortoastfn} = useAuthContext();

  const handleInput=(e)=>{
    try {
      let {name , value} = e.target;
      setUser({...user , [name] : value});
      // console.log(user);
    } catch (error) {
      console.log(error);
      errortoastfn("Some internal error has occured");
    }
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/user/login" , user);
      // console.log(res.data);
      if(res.data.success){
        toastfn("Logged in successfully");
        localStorage.setItem("token" , JSON.stringify(res.data.authtoken));
        setAuth(true);
        if(location){
          navigate(location);
        }else{
          navigate('/')
        }
        
      }else{
        // window.alert(res.data.message);
        errortoastfn(res.data.message);
      }
    } catch (error) {
      console.log(error);
      errortoastfn("some internal error has occured please try again latter")
    }
  }
  return (
    <div className='container-fluid lgupbg ' style={{'minHeight' : '92vh'}}>
      <div className="row justify-content-center align-items-center" style={{'height' : "90vh"}} >
        <div className="col-lg-5 col-md-7 col-sm-8 col-9 sgboxbg">
        <form>
          <h3 className='text-center text-light lghead'>Login</h3>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label lbl">Email address</label>
            <input type="email" name='email' className="form-control inptClr" id="exampleInputEmail1" onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label lbl"> Password </label>
            <input type="password" name='password' className="form-control inptClr" id="password" onChange={handleInput} />
          </div>
          <div className="mt-4 btncenter">
            <button type="submit" className="btn btn-outline-danger" style={{'margin' : 'auto' , 'fontWeight' : "bold"}}onClick={handleSubmit}>login</button>
          </div> 

          
        </form>
      </div>
      </div>
    </div>
  )
}

export default Signin
