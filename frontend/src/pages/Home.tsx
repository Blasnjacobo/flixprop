import Colecciones from '../components/Home/Colecciones'
import MasReciente from '../components/Home/MasReciente'
import Noticias from '../components/Home/Noticias'
import Ofrecemos from '../components/Home/Ofrecemos'
import Slider from '../components/Home/Slider'
import Universos from '../components/Home/Universos'
import MasVendido from '../components/Home/MasVendido'

const Home = () => {
  return (
    <div className='home-container'>
      <Slider />
      <h3 className='homeContainer-text'>NUEVOS PROPS</h3>
      <MasReciente />
      <h3 className='homeContainer-text'>UNIVERSOS</h3>
      <Universos />
      <h3 className='homeContainer-text'>COLECCIONES</h3>
      <Colecciones />
      <h3 className='homeContainer-text'>LO MAS VENDIDO</h3>
      <MasVendido />
      <h3 className='homeContainer-text'>NOTICIAS</h3>
      <Noticias />
      <Ofrecemos />
    </div>
  )
}

export default Home