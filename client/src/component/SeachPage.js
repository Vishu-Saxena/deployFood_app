import React, { useEffect, useState } from 'react'
import { useSearchContext } from '../context/SearchContext'
import FoodCard from '../subcomponent/FoodCard';
import "../style/search.css"
import { useNavigate } from 'react-router-dom';
const SeachPage = () => {

  const {searchResult , search , setSearch ,SearchRes , loading} = useSearchContext();
  const [text , setText] = useState(search);
  const navigate = useNavigate();
  const handleOnclick=(e)=>{
    e.preventDefault();
    setText(search);
    SearchRes();
  }

  useEffect(()=>{
    if(!text){
      navigate('/');
    }
  })

  return (
    <div className='container'>

      <div className="row justify-content-between my-3">
        <div className="col-6 border srchHeadingbx"> <h3 className='srchHeading'> Showing results for <span className='text-danger'> "{text}" </span> </h3> </div>
        <div className="col-sm-6 border"> <div className="searchbox">
            <div className='d-flex justify-content-around align-items-center' style={{'borderRadius' : "10px"}}>
                <input className="search border" type="search" placeholder="Search for your favourite cuisine or food" onChange={(e)=> setSearch(e.target.value) }/>
                <button type="button" className="btn btn-outline-danger" onClick={handleOnclick} > Search </button>
            </div>
            
        </div> </div>
      </div>

      <div className="row">
        {searchResult ? searchResult.map((ele)=> <FoodCard food={ele} /> ) : loading ? "loading..." : "we don't have food items matching your search." }
      </div>
    </div>
  )
}

export default SeachPage
