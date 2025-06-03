import React, { useState } from 'react'
import { useFoodContext } from '../context/FoodData'
import { VscArrowDown , VscArrowUp} from "react-icons/vsc";
import FoodCard from './FoodCard';

const HomeBody = () => {
    const {Hrated , Hdemand , Party} = useFoodContext();
    console.log(Hdemand);
    const [Hcount , setHcount] = useState(8);
    const [Hdcount , setHdcount] = useState(8);
    const [Pcount , setPcount] = useState(4);
    console.log(Party);
  return (
    <div className='container-fluid'>
      <div className="row justify-content-center">
        <div className="col-lg-11 col-12">
        <div className="row justify-content-around mt-5">
        <h2> <span className='text-danger'> Highest </span> Rating</h2>
        {Hrated ? Hrated.slice(0,Hcount).map((food)=> <FoodCard food = {food}/>) :""}
        {Hcount < Hrated.length? <VscArrowDown className='btnmore' onClick={()=>setHcount(Hcount+4)}  /> : <VscArrowUp className='btnmore' onClick={()=>setHcount(8)} /> }
        
      </div>
      <div className="row justify-content-around mt-4">
        <h2> <span className='text-danger'> High o</span>n demand</h2>
        {Hdemand ? Hdemand.slice(0,Hdcount).map((food)=> <FoodCard food = {food}/>) :""}
        {Hdcount < Hdemand.length ? <VscArrowDown className='btnmore' onClick={()=>setHdcount(Hdcount+4)}  /> : <VscArrowUp className='btnmore' onClick={()=>setHdcount(8)} /> }
      </div>
      <div className="row justify-content-around mt-4">
        <h2><span className='text-danger'> Wanna Party?</span> We got you</h2>
        {Party ? Party.slice(0,Pcount).map((food)=> <FoodCard food = {food}/>) :""}
        {Pcount < Party.length ? <VscArrowDown className='btnmore' onClick={()=>setPcount(Pcount+4)}  /> : <VscArrowUp className='btnmore' onClick={()=>setPcount(4)} /> }
      </div>
        </div>
      </div>
      
    </div>
  )
}

export default HomeBody
