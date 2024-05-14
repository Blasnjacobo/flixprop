import CategoriasHome from '../components/Home/CategoriasHome'
import MasReciente from '../components/Home/MasReciente'
import MasVendido from '../components/Home/MasVendido'
import Noticias from '../components/Home/Noticias'
import Ofrecemos from '../components/Home/Ofrecemos'
import Slider from '../components/Home/Slider'
import Universos from '../components/Home/Universos'

const Home = () => {
  return (
    <div className='home-container'>
      <Slider />
      <h3 className='masVendido-text'>NUEVOS PROPS</h3>
      <MasReciente />
      <Universos />
      <CategoriasHome />
      <h3 className='masVendido-text'>LO MAS VENDIDO!</h3>
      <MasVendido />
      <Noticias />
      <Ofrecemos />
    </div>
  )
}

export default Home
