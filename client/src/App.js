import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { Route , Routes } from "react-router-dom";
import Signin from "./component/Signin";
import Sigup from "./component/Sigup";
import Particular from "./component/Particular";
import DetailedFood from "./component/DetailedFood";
import CartPage from "./component/CartPage";
import Footer from "./component/Footer";
import Orders from "./subcomponent/Orders";
import SeachPage from "./component/SeachPage";
function App() {
  
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Sigup/>}/>
        <Route path="/category/:categoryname" element={<Particular/>}/>
        <Route path="/Zfood/:id" element={<DetailedFood/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/orders" element={<Orders/>} />
        <Route path="/search" element={<SeachPage/>} />
        <Route path="*" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
