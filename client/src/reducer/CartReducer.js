const CartReducer = (state , action )=>{
    console.log(state , action);
    switch (action.type) {
        case "ADDITM":

            // searching whether this itm already exist or not
            let filtercart = state.cart.filter((ele)=> ele.id !== action.payload.id )
            return{
                ...state,
                total_items : state.total_items +1,
                cart : [...filtercart , action.payload]
            }
        case "TOTAL":
            let totalamnt = 0;
            let totalitm = 0;
            state.cart.map((ele)=>{
                totalamnt = totalamnt + ele.subtotal;
                totalitm = totalitm +1;
            })
            return{
                ...state,
                total_items : totalitm,
                total_amount : totalamnt,
                shipping_fee : totalamnt > 500 ? 0 : 100
            }

        case "INCREMENT":
            let updatedCartItms = state.cart.map((ele)=>{

                if (ele.id === action.payload && ele.qty < 10) {
                  console.log("incrementing");
                 let newqnt = ele.qty + 1;
                 let newsubTotal = ele.price * newqnt;
                 return {...ele , qty : newqnt , subtotal : newsubTotal}
          
                }else{
                    console.log("not incrementing");
                  return ele;
                }
          
              })
            return{
                ...state,
                cart : updatedCartItms
                // total_items : state.total_items +1
                
            }
        case "DECREMENT":
            let updatedCartItems = state.cart.map((ele)=>{

                if (ele.id === action.payload && ele.qty > 1) {
                  
                 let newqnt = ele.qty - 1;
                 let newsubTotal = ele.price * newqnt;
                 return {...ele , qty : newqnt ,subtotal : newsubTotal}
          
                }else{
                  return ele;
                }
          
              })
            return{
                ...state,
                cart : updatedCartItems
                // total_items : state.total_items +1
                
            }

            case "REMOVE":
                let newCart = state.cart.filter((ele)=> ele.id !== action.payload );
            return{
                ...state,
                cart : newCart
            }

            case "CLEAR" : 
                return{
                    ...state,
                    cart : []
                }
    
        default:
            return state
    }
}

export default CartReducer;