import {FaTrashAlt ,FaMinus , FaPlus} from 'react-icons/fa';

import { useCartContext } from "../context/CartContentext"
import "../style/cart.css"
import CartTotal from '../subcomponent/CartTotal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmptyCart from '../subcomponent/EmptyCart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOrderHistory } from '../context/OdrHistContext';
import { useAuthContext } from '../context/AuthContext';

const CartPage = () => {
  const {cart ,Increment , Decrement , total_amount , total_items ,removeFromCart ,clearCart} = useCartContext();
  const {isAuthorized , CheckAuthentication ,toastfn , errortoastfn , userID} = useAuthContext();
  // console.log(userID);
  const{addOderHistory } = useOrderHistory();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const navigate = useNavigate();
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/food/braintree/token");
      setClientToken(data?.clientToken);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //handle payments
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8080/api/food/braintree/payment", {
        nonce,
        cart,
      });
      console.log(cart);
      // let orderId = cart.map((ele)=> ele.id );
      // localStorage.setItem("orderHistory" , JSON.stringify(cart));
      cart.map((ele)=>addOderHistory({...ele , userId : userID}))
      
      localStorage.setItem("cartData" , JSON.stringify(cart));
      clearCart();
      navigate("/orders");
      toastfn("Payment Completed Successfully")
    } catch (error) {
      console.log(error);
      errortoastfn("Something went wrong")
    }
  };

  let path = useLocation().pathname;
  useEffect(() => {
    if(!isAuthorized){
      CheckAuthentication(path);
    }else{
      getToken();
    }
    
  }, []);
  return (
    <>
    <div className="container" style={{'minHeight' : "17rem"}}>
    {!cart.length ? <EmptyCart page={"cart"}/> : <table className="table table-hover text-secondary mt-5 mb-1 fnt" >
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col" className='td-hide' style={{"textAlign" : "center"}}>Price</th>
            <th scope="col" style={{"textAlign" : "center"}}>Quantity</th>
            <th scope="col" style={{"textAlign" : "center"}}>Subtotal</th>
            <th scope="col" style={{"textAlign" : "right"}}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((ele)=>{ 
            return <tr key={ele.id}>
              <td> <div className="crtNme">
                  <div className='crtImg'> <img src={ele.img} alt="" />  </div>
                  <div className='cartclr'> 
                    <p> {ele.name} </p>

                    {/* <div className='clrbtn crtclrbtn' style={{'background' : ele.color}}>  </div> */}
                  </div>
                </div> </td>
              <td className='td-hide' style={{"textAlign" : "center" , 'lineHeight' : "40px"}}> Rs{ele.price} </td>


              <td className='td-hide text-body-secondary' style={{"textAlign" : "center" , 'lineHeight' : "40px"}}> <div className='d-flex justify-content-center'> <FaMinus className='text-secondary mt-2' onClick={()=>Decrement(ele.id)} /> <p className='mx-2'> {ele.qty} </p> <FaPlus className='text-secondary mt-2' onClick={()=>Increment(ele.id)} /></div> </td>


              <td style={{"textAlign" : "center" , "margin" : "auto" , 'lineHeight' : "40px"}}> Rs{ele.subtotal} </td>
              <td style={{"textAlign" : "right", 'lineHeight' : "40px"}} className=' mt-3'> < FaTrashAlt style={{"color" : "red"}} onClick={()=>{removeFromCart(ele.id)}} /> </td>
            </tr>
          })}
        </tbody>
      
      </table> }
      {cart?.length ? <><div className='btnDiv'>
        <Link to={'/'}> <button type="button" className="btn text-light"  style={{"background" : "#20c997"}}>Continue Shopping</button></Link>

        <button type="button" className={`btn btn-danger ${cart?.length ? "" : 'disabled'}` }onClick={clearCart}>Clear Cart</button>

      </div></> : ""}
      
      {cart?.length ? <CartTotal clientToken ={clientToken}  cart ={cart} setInstance = {setInstance} handlePayment ={handlePayment}/> :""}
      
      </div>
    </>
  )
}

export default CartPage
