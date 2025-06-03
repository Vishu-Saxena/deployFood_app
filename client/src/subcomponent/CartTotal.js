import { useCartContext } from "../context/CartContentext";
import Payment from "./Payment";

const CartTotal = ({clientToken , cart , setInstance , handlePayment }) => {
    const {total_amount , shipping_fee} = useCartContext();
    // console.log(total_amount , shipping_fee);
    
  return (
    <div className='row d-flex justify-content-end'>
        <div className='border me-3 mt-3 p-3 text-secondary bg-light cartTotaldiv' >
            <div className='d-flex justify-content-between'> <p>Subtotal  :</p> <p> Rs {total_amount} </p> </div>
            <div className='d-flex justify-content-between'> <p>Shipping Fee : </p> <p> Rs {shipping_fee} </p> </div>
            {shipping_fee !== 0 ? <p className='smlTxt text-center'> Shop above 500 to get free shipping </p> : null}
            <hr />
            <div className='d-flex justify-content-between '><p>OrderTotal : </p>  <p> Rs {total_amount + shipping_fee} </p> </div>
            <Payment clientToken ={clientToken}  cart ={cart} setInstance = {setInstance} handlePayment ={handlePayment}/>

        </div>
    </div>
  )
}

export default CartTotal
