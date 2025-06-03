import React from 'react'
import '../style/head.css';
import { CiSearch } from "react-icons/ci";
import { useSearchContext } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const Head = () => {
  const { searchResult, setSearch , SearchRes} = useSearchContext();
  const navigate = useNavigate();
  console.log(searchResult);
  const handleOnclick=(e)=>{
    e.preventDefault();
    SearchRes();
    navigate('/search');
    console.log("onclick");
  }
  return (
    <div className='container-fluid hbg text-light text-center d-flex justify-content-center align-items-center'>
      <div className='headbox'>
        <h1 className='headingtxt'>FeastFinder</h1>
        <h2 className='headnortext'> Discover the best food and meals just in a blink</h2>
        <div className="searchbox">
            <div className='d-flex bg-light justify-content-around align-items-center' style={{'borderRadius' : "10px" , 'paddingRight' : "0.8rem" , 'paddingLeft' : "0.4rem"}}>
                <CiSearch className='sicon text-secondary' />
                <input className="headsearch border" type="search" placeholder="Search for your favourite cuisine or food" onChange={(e)=> setSearch(e.target.value) }/>
                <button type="button" className="btn btn-outline-danger" onClick={handleOnclick}> Search </button>
            </div>
            {searchResult.length ? ""  : ""}
        </div>
      </div>
    </div>
  )
}

export default Head
