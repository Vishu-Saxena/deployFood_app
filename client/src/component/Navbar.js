import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContentext';

const Navbar = () => {
    const {isAuthorized , setToken , setAuth} = useAuthContext();
    const {total_items} = useCartContext();
    // console.log(isAuthorized);
    const location = useLocation().pathname;
    // console.log(location);

    const logOut = ()=> {
        localStorage.removeItem("token");
        setToken("");
        setAuth(false);
    }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark" style={{'background' :"#CC313D"}}>
        <div className="container-fluid">
            <Link className="navbar-brand text-dark" to={'/'}> <span style={{'fontFamily' : "Lora" , 'fontStyle':"italic" , "fontWeight" :"bolder"}}> FeastFinder </span> <img src="./image/foodlogo.png" alt="" style={{'width':"30px" , 'height' : "30px" , "borderRadius" : "100%"}} /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location==="/"? "active" : ""}`} aria-current="page" to={'/'}> Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location==="/orders"? "active" : ""}`} aria-current="page" to={'/orders'}> Your_Orders</Link>
                </li>
               
            </ul>
            <div className="d-flex">

               {isAuthorized ? <><Link className={`btn bg-white text-danger mx-3 position-relative`} to={'/cart'}>My Plate<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info mt-1 me-1"> {total_items} </span> </Link>

                <Link className={`btn bg-dark text-danger ${location==="/signup"? "active" : ""}`} to={'/signup'} onClick={logOut}>logout</Link></>  :
               <> <Link className={`btn bg-white text-danger mx-2 ${location==="/signup"? "active" : ""}`} to={'/signup'}>Sign-up</Link>
   
                <Link className={`btn bg-white text-danger ${location==="/signin"? "active" : ""}`} to={'/signin'}>Login</Link></> }
   
            </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar
