import React, { useEffect, useState } from 'react';
import {FaTrashAlt} from 'react-icons/fa';

import EmptyCart from './EmptyCart';
import { useOrderHistory } from '../context/OdrHistContext';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Orders = () => {
 
  const {orderHist , deleteOrder ,loading} = useOrderHistory();
  const {isAuthorized , CheckAuthentication} = useAuthContext();

  const StatusTimer = (orderdate)=>{
    console.log(orderdate);

    // Given date object
    const givenDate = new Date(orderdate);
    console.log(givenDate , "Given date");

    // Calculate the target time by adding 30 minutes
    const targetTime = new Date(givenDate.getTime() + 30 * 60 * 1000);

    console.log(targetTime , "targettime");
    const currentTime = new Date();
    console.log(currentTime , "current time");
    if(currentTime >= targetTime){
      return "Delivered"
    }else{
      return "In process"
    }
  }

const [orderStatus , setStatus] = useState([]);
// console.log(orderStatus);

let path = useLocation().pathname;
useEffect(()=>{
  if(!isAuthorized){
    CheckAuthentication(path);
    return;
  }
  let arr = [];
  if(orderHist.length){
    arr = orderHist.map((ele)=>{
      console.log(ele.OrderDate , "ele");
      return StatusTimer(ele.OrderDate);
    } );
    setStatus(arr);
  }
  
},[orderHist.length])

  return (
   
    <div className="container mb-4" style={{'minHeight' : "19rem"}}>
   
    { loading ? <h5 className='text-center text-secondary mt-3'> Loading... </h5>: !orderHist.length ? <EmptyCart page={"orders"}/> : <table className="table table-hover text-secondary mt-5 mb-1 fnt" >
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col" className='td-hide' style={{"textAlign" : "center"}}>Price</th>
            <th scope="col" style={{"textAlign" : "center"}}>Quantity</th>
            <th scope="col" style={{"textAlign" : "center"}}>Subtotal</th>
            <th scope="col" style={{"textAlign" : "center"}}>Status</th>
            <th scope="col" style={{"textAlign" : "right"}}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {orderHist.map((ele , indx)=>{ 
            return <tr key={ele._id}>
              <td> <div className="crtNme">
                  <div className='crtImg'> <img src={ele.img} alt="" />  </div>
                  <div className='cartclr'> 
                    <p> {ele.name} </p>

                    {/* <div className='clrbtn crtclrbtn' style={{'background' : ele.color}}>  </div> */}
                  </div>
                </div> </td>
              <td className='td-hide' style={{"textAlign" : "center" , 'lineHeight' : "40px"}}> Rs{ele.price} </td>


              <td className='td-hide text-body-secondary' style={{"textAlign" : "center" , 'lineHeight' : "40px"}}> <div className='d-flex justify-content-center'> <p className='mx-2'> {ele.quantity} </p></div> </td>


              <td style={{"textAlign" : "center" , "margin" : "auto" , 'lineHeight' : "40px"}}> Rs{ele.subtotal} </td>
              <td className={`${orderStatus.length ? orderStatus[indx] === "Delivered" ? 'text-success':"text-warning" :""}`} style={{"textAlign" : "center" , "margin" : "auto" , 'lineHeight' : "40px"}}> {orderStatus.length ? orderStatus[indx] :""} </td>
              <td style={{"textAlign" : "right", 'lineHeight' : "40px"}} className=' mt-3'> < FaTrashAlt style={{"color" : "red"}} onClick={()=>deleteOrder(ele._id)}  /> </td>
            </tr>
          })}
        </tbody>
      
      </table> }
      </div>
 
  )
}

export default Orders
