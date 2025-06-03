import { createContext, useContext, useEffect, useState } from "react";
import { useFoodContext } from "./FoodData";

const searchContext = createContext();

const SearchVal =(props)=>{
    const{allFood} = useFoodContext();
    const [search , setSearch] = useState("");
    const [loading , setLoading] = useState(true);
    console.log(search);
    
    const [searchResult, setResult] = useState([]);
    console.log(searchResult);

    const SearchRes =()=>{
        setLoading(true);
        let searcharr = allFood.filter((ele)=> ele.name.toLowerCase().includes(search.toLowerCase()) || ele.CategoryName.toLowerCase().split('-').includes(search.toLowerCase()) || ele.description.toLowerCase().includes(search.toLowerCase()));
        if(searcharr.length){
            setResult(searcharr)
            setLoading(false);
        }
    }

    return <searchContext.Provider value={{search , setSearch , searchResult ,SearchRes , loading}}> {props.children} </searchContext.Provider>
}

// custom context
const useSearchContext = ()=> useContext(searchContext);

export default SearchVal
export {useSearchContext , searchContext}