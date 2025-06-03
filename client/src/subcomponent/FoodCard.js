import React, { useState } from 'react'
import '../style/card.css';
import {MdOutlineStar} from 'react-icons/md';
import { Link } from 'react-router-dom';

const FoodCard = (props) => {
  
  const {name , description , img , restaurentName , ratings , CategoryName , options , _id} = props.food;
  // console.log(options[0]);
  var result = Object.keys(options[0]).map((key) => [key, options[0][key]]);
// console.log(result);
  // const [types , setType]= useState( options? Object.keys(options[0]) : []);
  // const [price , setPrice] = useState(options ? Object.values(options[0]) : []);
  return (
    <div className='col-xl-3 col-md-4 col-sm-6 col-12 mt-3'>
    <div className="card card2 ">
        <img src={img} className="card-img-top" alt="..."/>
        <div className="card-body">
          <div className="row">
            <div className="col-9"> <p className="card-title">{name.slice(0,18)}</p></div>
            <div className="col-3 d-flex justify-content-end align-items-center"> <span class="badge bg-danger">{ratings} <MdOutlineStar/> </span></div>
          </div>
            
            {/* <p className="card-text">{description.slice(0 , 50)}</p> */}
            <div className="row">
              <div className="col-5 text-start"> <p className='bdtext'>{CategoryName} </p> </div>
              <div className="col-7 text-end"> <p className='bdtext'>{restaurentName.slice(0,15)} </p> </div>
            </div>
            <div className="row">
                <div className="col-6 text-start"> 
                  <div className="row">
                    <div className="col-12">
                    <select class="form-select"> Quantity 
                      <option value="price" selected> Price </option>
                      {result.map((tp , indx)=> <option> {tp[0] + " " + "Rs" + tp[1]} </option> )}
                    </select>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-end d-flex justify-content-end align-items-center">  <Link to={`/Zfood/${_id}`}> <button type="button" class="btn btn-danger btn-sm btntext">More details</button></Link>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default FoodCard
