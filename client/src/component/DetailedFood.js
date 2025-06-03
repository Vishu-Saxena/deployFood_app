import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../style/detail.css'
import { FaArrowRight ,FaPlus , FaMinus} from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import FoodCard from '../subcomponent/FoodCard';
import { useCartContext } from '../context/CartContentext';
import { useAuthContext } from '../context/AuthContext';
// import {addItm} from '../context/CartContentext'

const DetailedFood = () => {
  const {isAuthorized , CheckAuthentication ,toastfn , errortoastfn} = useAuthContext();
  
  
    const {id} = useParams();
    const [fooditm , setItm] = useState();
    const [count , setCount] = useState(1);
    const[price , setPrice] = useState(0);
    const [pricetyp , setPriceTyp] = useState()
    const [Similar , setSimilar] = useState([]);
    const {addItm} = useCartContext();
    const navigate= useNavigate();
    // console.log(price);
    // console.log(fooditm);

    var result = [];
    if(fooditm){
     result =  Object.keys(fooditm.options[0]).map((key) => [key, fooditm.options[0][key]]);
    }
    // console.log(result);

    // function to fetch the seleted food itm's complete details details 
    const details = async()=>{
      try {
        if(id){
          const res = await axios.get(`http://localhost:8080/api/food/getsingleFood/${id}`);
          // console.log(res);
          if(res?.data?.success){
            setItm(res.data.foodData[0]);
          }
        }
      } catch (error) {
        console.log(error);
        errortoastfn("something went wront please try again latter")
      }
    }


    const handleSubmit = (e)=>{
      e.preventDefault();
      if(!price){
        errortoastfn("Select the price");
        return;
      }

      const cartitm = {
        price : price,
        name : fooditm.name,
        img : fooditm.img,
        qty : count,
        id : fooditm._id,
        subtotal : count * price
      }
      console.log(cartitm);
      addItm(cartitm);
      navigate('/cart');
      
    }

    const getthedata =async()=>{
      try {
          if(fooditm?.CategoryName){
              const res = await axios.get(`http://localhost:8080/api/food/foodofsinglesamecat/${fooditm.CategoryName}`);
              // console.log(res);
              if(res?.data?.success){
                  setSimilar(res.data.data);
              }
          }
      } catch (error) {
          console.log(error);
          errortoastfn("something went wrong , Please try again later.")
      }
  }

  let path = useLocation().pathname;
    useEffect(()=>{
        if(!isAuthorized){
          CheckAuthentication(path);
        }else{
          details();
        }
 
    },[]);
    useEffect(()=>{
      getthedata()
    } , [fooditm]);
  return (
    <div className='container' style={{'minHeight' : "22rem"}}>
      {fooditm ? <div className="row mt-5">
            <div className="col-md-5 dimg"> <img src={fooditm.img} alt="" /> </div>
            <div className="col-md-7">
              <h2 className='text-center' style={{'textDecoration' : "underline red 4px"}}> {fooditm.restaurentName} </h2>
              <p className='text-center dtxt text-secondary mt-2'>  {fooditm.name} {<FaArrowRight />} {fooditm.CategoryName} {<FaArrowRight/>} Ratings <span class="badge bg-danger">{fooditm.ratings} <MdOutlineStar className='mb-1'/> </span></p>

              <p className='text-secondary'> <span style={{'textDecoration' : "underline red 2px" , 'color' : "black" , 'fontWeight' : "bold"}}>Description </span> : {fooditm.description} </p>

              <div className="row d-flex flex-row justify-content-around">
                <div className=" col-sm-4 d-flex justify-content-center align-items-center dprice border"> 
                <select class="form-select" onChange={(e)=>{ setPrice( parseInt(e.target.value.split(',')[1] , 10) , setPriceTyp(e.target.value.split(',')[0]) )}} >  price list 
                      <option value={'price , 0'} selected> Price List</option>
                      {result.map((tp , indx)=> <option value={tp} > {tp[0] + "  : "  + "Rs" + tp[1]} </option> )}
                    </select>
                </div>
                <div className="col-sm-3 border dqntity d-flex justify-content-center align-items-center"> <FaMinus className='text-secondary' onClick={ ()=> count>1 ? setCount(count-1) : setCount(1) } /> <p className='mt-3 mx-2'> {count} </p> <FaPlus className='text-secondary' onClick={ ()=> count < 10 ? setCount(count + 1) : setCount(count) } /> </div>
                <div className=" col-sm-4 border dtotal text-center d-flex justify-content-center align-items-center "> Total : Rs {price * count} </div>
              </div>

              <div className='d-flex justify-content-center mt-4'>
               <button className=' btn btn-success'  onClick={handleSubmit}> Add to Cart </button>
              </div>

            </div>
            <div className="col-12 mt-3">
              <h2> <span className='text-danger'>Similar </span> Interest </h2>
              <div className="row">
              { Similar.length ? Similar.map((itm , indx)=> <FoodCard key={indx} food = {itm} />)  : ""}
              { Similar.length ? Similar.map((itm , indx)=> <FoodCard key={indx} food = {itm} />)  : ""}
              </div>
            </div>
        </div> : ""}
        
      
    </div>
  )
}

export default DetailedFood
