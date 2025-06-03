import Head from '../subcomponent/Head'
import { useFoodContext } from '../context/FoodData'
import HomeBody from '../subcomponent/HomeBody'
import Footer from './Footer'
import Slider from '../subcomponent/Slider'

const Home = () => {
  const {allFood } = useFoodContext();
  return (
    <>
    <Head/>
    <Slider/>
    <HomeBody/>
    </>
  )
}

export default Home
