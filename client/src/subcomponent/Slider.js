import React, { useState } from 'react'
import '../style/slider.css';
import { useFoodContext } from '../context/FoodData';
import SlideCompo from './SlideCompo';
const Slider = () => {
   const {categories} =useFoodContext();
  return(
    <>
      <div className="container mt-4">
        
        <div className="row d-flex justify-content-center">
          <div className="col-md-10"><h2 className='text-center'> <span className='text-danger'>What's on </span>your mind ?</h2> </div>
        
        <div className="col-md-10 d-flex justify-content-between bx">
        {categories.map((cat)=><SlideCompo category = {cat}/>)}
        </div>
        </div>
      </div>
    </>
  )
}

export default Slider
