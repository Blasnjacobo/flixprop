// import Categorias from '../components/Home/Categorias'
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
      <MasReciente />
      <Universos />
      <Noticias />
      {/*<Categorias />*/}
      <MasVendido />
      <Ofrecemos />
    </div>
  )
}

export default Home