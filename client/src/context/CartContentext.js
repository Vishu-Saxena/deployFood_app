import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/CartReducer';

const cartContext = createContext();

const CartValue = (props)=>{

     const getLocalCartData=()=>{
        const cartData = localStorage.getItem("cartData");
        if(cartData?.length){
            return JSON.parse(cartData);
        }else{
            return []
        }
     }

    const initialState = {
        total_items : "",
        total_amount  :"",
        shipping_fee : 100,
        cart :getLocalCartData()
    }
    
    const [state , dispatch]  = useReducer(reducer , initialState);
    // funtion to calculate total itms
    const total=()=>{
        dispatch({type: "TOTAL" })
    }
    // function to add cart itm
    const addItm =(itm)=>{
        dispatch({type :"ADDITM" , payload : itm});
    }

    // fucntion to increment itm on cart display page
    const Increment = (id)=>{
        dispatch({type : "INCREMENT" , payload : id})
    }
    // fucntion to Decrement itm on cart display page
    const Decrement = (id)=>{
        dispatch({type : "DECREMENT" , payload : id})
    }

    // function to remove itm from cart
    const removeFromCart= (id)=>{
        dispatch({type : "REMOVE" , payload : id})
    }

    // function to clear the cart
    const clearCart =()=>{
        dispatch({type : "CLEAR"})
    }

    useEffect(()=>{
        localStorage.setItem("cartData" , JSON.stringify(state.cart));
        total();
        console.log(state);
    },[state.cart])

    return <cartContext.Provider value={{...state , addItm , Increment , Decrement , removeFromCart , clearCart}}> {props.children} </cartContext.Provider>
}

// custom hook
const useCartContext=()=>{
    return useContext(cartContext);
}

export default CartValue;
export {useCartContext , cartContext};