import { Link } from 'react-router-dom'
import '../style/cart.css';
import { FaPlateWheat } from "react-icons/fa6";
const EmptyCart = ({page}) => {
  return (
    <div className=' container emtyCartbx text-secondary'>
        <div>
          {page === "cart" ? <h1>Oops! Your {<FaPlateWheat />} is empty</h1>:<h1> Your order history is empty </h1>}
            
            
            <Link to={'/'}> <button type="button" className="btn text-light my-3"  style={{"background" : "#20c997"}}>Continue Shopping</button></Link>
        </div>

    </div>
  )
}

export default EmptyCart