import axios from "axios";
import { useAuthContext } from "./AuthContext";

const { createContext, useContext, useState, useEffect } = require("react");

const orderHistoryContext = createContext();


const OderHisVal = (props)=>{
    const name = "order"
    const [orderHist , setOrderhist] = useState([]);
    const [loading , setLoading] = useState(true);
    const {userID} = useAuthContext()

    // function to fetch to order history list
    const getorderhist=async(userid)=>{
        try {
            const res = await axios.get(`http://localhost:8080/api/ordershistory/getorders/${userid}`);
            if(res?.data?.getOrders){
                setOrderhist(res.data.getOrders);
                setLoading(false);
            }else{
                console.log(res);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            window.alert("error in getting orders history");
            setLoading(true);
        }
    }
    // function to add orders to order history
    const addOderHistory = async(order)=>{
        console.log("into oder history");
        console.log(order);
        const res= await axios.post("http://localhost:8080/api/ordershistory/addOrders" , {...order} );
                if(!res?.data?.success){
                    console.log(res);
                    
                }
        console.log(order);
    }

    // fucntion to delete the order from order history 
    const deleteOrder = async(id)=>{
        console.log("inside delete order");
        console.log(id);
        try {
            if(id){
                const res = await axios.delete(`http://localhost:8080/api/ordershistory/deleteOrder/${id}`);
                if(res?.data?.success){
                    window.alert("deleted successfully");
                    // window.location.reload();
                }
            }
        } catch (error) {
            console.log(error);
            window.alert("error in deleting the order")
        }
    }
    useEffect(()=>{
        getorderhist(userID);
    },[orderHist , deleteOrder ,addOderHistory]);
    return <orderHistoryContext.Provider value = {{name , orderHist , addOderHistory , deleteOrder ,loading , setLoading}}> {props.children} </orderHistoryContext.Provider>
}

// creating custom context
const useOrderHistory=()=>{
    return useContext(orderHistoryContext)
}
export default OderHisVal
export {orderHistoryContext , useOrderHistory}