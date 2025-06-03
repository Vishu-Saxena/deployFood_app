import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FoodCard from '../subcomponent/FoodCard';
import { useAuthContext } from '../context/AuthContext';

const Particular = () => {
    const {categoryname} = useParams();
    const [Fooditms , setFood] = useState([]);
    const {toastfn , errortoastfn} = useAuthContext()
    console.log(Fooditms);
    // function to fetch the data from backend
    const getthedata =async()=>{
        try {
            if(categoryname){
                const res = await axios.get(`http://localhost:8080/api/food/foodofsinglesamecat/${categoryname}`);
                // console.log(res);
                if(res?.data?.success){
                    setFood(res.data.data);
                }
            }
        } catch (error) {
            console.log(error);
            errortoastfn("something went wrong , Please try again later.")
        }
    }

    useEffect(()=>{
        getthedata();
    },[]);
  return (
    <div className='container mt-3' style={{'minHeight' : "22rem"}}>
        <div className="row d-flex justify-content-center">
        <h1 className='text-center' style={{'textDecoration' : "underline red 4px"}} > {categoryname} </h1>
        { Fooditms.length ? Fooditms.map((itm , indx)=> <FoodCard key={indx} food = {itm} />)  : <h1 className='text-secondary text-center my-3' style={{'fontSize' : "1.4rem"}}> We don't have food items for this category, We will soon update our kitchen. Thank You! </h1>}
        </div>
    </div>
  )
}

export default Particular
