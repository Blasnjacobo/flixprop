import CategoriasHome from '../components/Home/CategoriasHome'
import Ofrecemos from '../components/Home/Ofrecemos'
import Slider from '../components/Home/Slider'

const Home = () => {
  return (
    <div className='home-container'>
      <Slider />
      <CategoriasHome />
      <Ofrecemos />
    </div>
  )
}

export default Home
