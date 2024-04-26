import CategoriasHome from '../components/Home/CategoriasHome'
import MasVendido from '../components/Home/MasVendido'
import Noticias from '../components/Home/Noticias'
import Ofrecemos from '../components/Home/Ofrecemos'
import Slider from '../components/Home/Slider'
import Universos from '../components/Home/Universos'

const Home = () => {
  return (
    <div className='home-container'>
      <Slider />
      <MasVendido />
      <Universos />
      <CategoriasHome />
      <Noticias />
      <Ofrecemos />
    </div>
  )
}

export default Home
