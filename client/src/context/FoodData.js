import { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios'
import reducer from "../reducer/FoodReducer";

const foodContext = createContext();

const FoodVal = (props)=>{
    const initialState = {
        categories : [],
        allFood : [],
        Hrated : [],
        Hdemand : [],
        Party : []
    }
    const [state , dispatch] = useReducer(reducer , initialState);
    // console.log(state);
    const getallFood = async()=>{
        try {
            const res = await axios.get("http://localhost:8080/api/food/getFooditems");
            if(res?.data?.success){
               return dispatch({type: "ALL" , payload : res.data.data});
            }else{
                // console.log(res);
                return window.alert("some internal error has occured please try again latter.");
                
            }
        } catch (error) {
            console.log(error);
            window.alert("some internal error has occured please try again latter.")
        }
    }
    const getallCategory = async()=>{
        try {
            const res = await axios.get("http://localhost:8080/api/food/getCategory");
            if(res?.data?.success){
               return dispatch({type: "ALLCAT" , payload : res.data.data});
            }else{
                console.log(res);
                return window.alert("some internal error has occured please try again latter.");
                
            }
        } catch (error) {
            console.log(error);
            window.alert("some internal error has occured please try again latter.")
        }
    }

    // fucntion to filter food with high ratings
    const highRatedFood = ()=>{
        return dispatch({type : "HR"})
    }

    useEffect(()=>{
        getallFood();
        getallCategory();
 
    }, []);

    useEffect(()=>{
        highRatedFood();
    },[state.allFood])
    return <foodContext.Provider value={{...state}}> {props.children} </foodContext.Provider>
}

// custom hook 
const useFoodContext = ()=>{
    return useContext(foodContext);
}

export default FoodVal;
export {useFoodContext , foodContext}