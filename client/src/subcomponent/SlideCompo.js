import { Link } from "react-router-dom"
import "../style/slider.css"

const SlideCompo = (props) => {
    
  return (
    <div className='slide' style={{width : "10rem"}}>
        <div className="d-flex justify-content-center flex-column">
      <Link to={`/category/${props.category.CategoryName}`}> <img className='slideimg' src={props.category.image} alt="" /></Link>
      <p className="text-center text-secondary"> {props.category.CategoryName} </p>
      </div>
    </div>
  )
}

export default SlideCompo
