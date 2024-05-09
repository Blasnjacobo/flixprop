import CategoriasHome from '../components/Home/CategoriasHome'
import Products from '../components/Home/Products'
import Noticias from '../components/Home/Noticias'
import Ofrecemos from '../components/Home/Ofrecemos'
import Slider from '../components/Home/Slider'
import Universos from '../components/Home/Universos'
import productos from '../assets/MasProductos/masVendidos.json'

const Home = () => {
  return (
    <div className='home-container'>
      <Slider />
      <h3 className='masVendido-text'>NUEVOS PROPS</h3>
      <Products productos={productos}/>
      <Universos />
      <CategoriasHome />
      <h3 className='masVendido-text'>LO MAS VENDIDO!</h3>
      <Products productos={productos}/>
      <Noticias />
      <Ofrecemos />
    </div>
  )
}

export default Home
