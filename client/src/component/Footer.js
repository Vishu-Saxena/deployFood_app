import React from 'react'
import {Link} from "react-router-dom";
import '../style/footer.css'
const Footer = () => {
  return (
    <div className='container-fluid bg-dark'>
      <h1 className='text-secondary heading py-2 text-center'> Explore the FeastFinder </h1>
      <div className="row prntlinkdiv">
        <div className="col-sm-3 col-6 linkDiv" style={{'border' : "none"}}>
            <li className='links'> <Link to={'/'} className='link'> Home </Link> </li>
            <li className='links'> <Link to={'/orders'} className='link'> Orders </Link> </li>
         </div>
        <div className="col-sm-3 col-6 linkDiv"> 
            <li className='links'> <Link to={'/'} className='link'> Highest Ratings </Link> </li>
            <li className='links'> <Link to={'/'} className='link'> Party Hit </Link> </li>
        </div>
        <div className="col-sm-3 col-6 linkDiv"> 
            <li className='links'> <Link to={'/'} className='link'> Blogs </Link> </li>
            <li className='links'> <Link to={'/'} className='link'> Parter With us </Link> </li>
        </div>
        <div className="col-sm-2 col-6 linkDiv">
            <li className='links'> <Link to={'/'} className='link'> Apps for you </Link> </li>
            <li className='links'> <Link to={'/'} className='link'> Our Story </Link> </li> 
        </div>
      </div>

      <div className="row prntlinkdiv dis py-3"style={{"border" : "none"}} >
        <div className="col-12 d-flex justify-content-evenly">
        <li className='links'> <Link to={'/'} className='link'>Contact_Us </Link></li>
        <li className='links'> <Link to={'/'} className='link'>Advertise with us </Link></li>
        
       
        <li className='links'> <Link to={'/'} className='link'>Privacy Policy </Link></li> 
        <li className='links'> <Link to={'/'} className='link'>About us </Link></li>
        
        
        <li className='links'> <Link to={'/'} className='link'>Join us </Link></li> 
        <li className='links'> <Link to={'/'} className='link'> Terms & conditions </Link></li>
        </div>
      </div>
      <div className="row prntlinkdiv2">
        <div className="col-4 linkDiv" style={{'border' : "none"}}>
            <li className='links'> <Link to={'/'} className='link'>Contact_Us </Link></li>
            <li className='links'> <Link to={'/'} className='link'>Advertise with us </Link></li>
         </div>
        <div className="col-4 linkDiv"> 
        <li className='links'> <Link to={'/'} className='link'>Privacy Policy </Link></li> 
        <li className='links'> <Link to={'/'} className='link'>About us </Link></li>
        </div>
        <div className="col-4 linkDiv"> 
        <li className='links'> <Link to={'/'} className='link'>Join us </Link></li> 
        <li className='links'> <Link to={'/'} className='link'> Terms & conditions </Link></li>
        </div>
      </div>
      <div className='row py-3'>
        <img className='logo' src="./image/foodlogo.png" alt="" style={{'margin' : "auto"}} />
        
      </div>
    </div>
  )
}

export default Footer
